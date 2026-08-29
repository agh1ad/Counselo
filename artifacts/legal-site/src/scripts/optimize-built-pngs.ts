import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  constants as zlibConstants,
  deflateSync,
  inflateSync,
} from "node:zlib";

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const MAX_FILE_BYTES = 24 * 1024 * 1024;

interface PngChunk {
  type: string;
  data: Buffer;
  raw: Buffer;
}

interface PngInfo {
  width: number;
  height: number;
  bitDepth: number;
  colorType: number;
  compression: number;
  filter: number;
  interlace: number;
}

function buildCrcTable(): Uint32Array {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = (c & 1) !== 0 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
}

const CRC_TABLE = buildCrcTable();

function crc32(buffer: Buffer): number {
  let crc = 0xffffffff;
  for (const value of buffer) {
    crc = CRC_TABLE[(crc ^ value) & 0xff]! ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function encodeChunk(type: string, data: Buffer): Buffer {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.allocUnsafe(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.allocUnsafe(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function parseChunks(input: Buffer): PngChunk[] | null {
  if (
    input.length < PNG_SIGNATURE.length ||
    !input.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)
  ) {
    return null;
  }

  const chunks: PngChunk[] = [];
  let offset = PNG_SIGNATURE.length;

  while (offset + 12 <= input.length) {
    const length = input.readUInt32BE(offset);
    const end = offset + 12 + length;
    if (end > input.length) return null;

    const type = input.toString("ascii", offset + 4, offset + 8);
    chunks.push({
      type,
      data: input.subarray(offset + 8, offset + 8 + length),
      raw: input.subarray(offset, end),
    });
    offset = end;

    if (type === "IEND") break;
  }

  return chunks;
}

function readInfo(chunks: PngChunk[]): PngInfo | null {
  const ihdr = chunks.find((chunk) => chunk.type === "IHDR")?.data;
  if (!ihdr || ihdr.length !== 13) return null;
  return {
    width: ihdr.readUInt32BE(0),
    height: ihdr.readUInt32BE(4),
    bitDepth: ihdr[8]!,
    colorType: ihdr[9]!,
    compression: ihdr[10]!,
    filter: ihdr[11]!,
    interlace: ihdr[12]!,
  };
}

function bytesPerPixel(info: PngInfo): number | null {
  if (info.bitDepth !== 8) return null;
  switch (info.colorType) {
    case 0:
      return 1; // grayscale
    case 2:
      return 3; // RGB
    case 3:
      return 1; // palette index
    case 4:
      return 2; // grayscale + alpha
    case 6:
      return 4; // RGBA
    default:
      return null;
  }
}

function paethPredictor(a: number, b: number, c: number): number {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function unfilterRow(
  filterType: number,
  filtered: Buffer,
  previous: Buffer | null,
  bpp: number,
): Buffer | null {
  const row = Buffer.allocUnsafe(filtered.length);

  for (let x = 0; x < filtered.length; x += 1) {
    const left = x >= bpp ? row[x - bpp]! : 0;
    const up = previous?.[x] ?? 0;
    const upLeft = x >= bpp ? previous?.[x - bpp] ?? 0 : 0;
    const value = filtered[x]!;

    switch (filterType) {
      case 0:
        row[x] = value;
        break;
      case 1:
        row[x] = (value + left) & 0xff;
        break;
      case 2:
        row[x] = (value + up) & 0xff;
        break;
      case 3:
        row[x] = (value + Math.floor((left + up) / 2)) & 0xff;
        break;
      case 4:
        row[x] = (value + paethPredictor(left, up, upLeft)) & 0xff;
        break;
      default:
        return null;
    }
  }

  return row;
}

function filteredCandidate(
  filterType: number,
  row: Buffer,
  previous: Buffer | null,
  bpp: number,
): { bytes: Buffer; score: number } {
  const bytes = Buffer.allocUnsafe(row.length);
  let score = 0;

  for (let x = 0; x < row.length; x += 1) {
    const left = x >= bpp ? row[x - bpp]! : 0;
    const up = previous?.[x] ?? 0;
    const upLeft = x >= bpp ? previous?.[x - bpp] ?? 0 : 0;
    let predictor = 0;

    switch (filterType) {
      case 1:
        predictor = left;
        break;
      case 2:
        predictor = up;
        break;
      case 3:
        predictor = Math.floor((left + up) / 2);
        break;
      case 4:
        predictor = paethPredictor(left, up, upLeft);
        break;
      default:
        predictor = 0;
    }

    const filtered = (row[x]! - predictor + 256) & 0xff;
    bytes[x] = filtered;
    const signed = filtered < 128 ? filtered : filtered - 256;
    score += Math.abs(signed);
  }

  return { bytes, score };
}

function chooseBestFilteredRow(
  row: Buffer,
  previous: Buffer | null,
  bpp: number,
): Buffer {
  let bestType = 0;
  let best = filteredCandidate(0, row, previous, bpp);

  for (let filterType = 1; filterType <= 4; filterType += 1) {
    const candidate = filteredCandidate(filterType, row, previous, bpp);
    if (candidate.score < best.score) {
      bestType = filterType;
      best = candidate;
    }
  }

  return Buffer.concat([Buffer.from([bestType]), best.bytes]);
}

function bestDeflate(input: Buffer): Buffer {
  const strategies = [
    zlibConstants.Z_DEFAULT_STRATEGY,
    zlibConstants.Z_FILTERED,
    zlibConstants.Z_RLE,
  ];

  let best: Buffer | null = null;
  for (const strategy of strategies) {
    const candidate = deflateSync(input, {
      level: 9,
      memLevel: 9,
      strategy,
    });
    if (!best || candidate.length < best.length) best = candidate;
  }

  return best!;
}

function optimizePng(input: Buffer): Buffer | null {
  const chunks = parseChunks(input);
  if (!chunks) return null;

  const info = readInfo(chunks);
  if (
    !info ||
    info.width === 0 ||
    info.height === 0 ||
    info.compression !== 0 ||
    info.filter !== 0 ||
    info.interlace !== 0
  ) {
    return null;
  }

  const bpp = bytesPerPixel(info);
  if (!bpp) return null;

  const idatChunks = chunks.filter((chunk) => chunk.type === "IDAT");
  if (idatChunks.length === 0) return null;

  let inflated: Buffer;
  try {
    inflated = inflateSync(Buffer.concat(idatChunks.map((chunk) => chunk.data)));
  } catch {
    return null;
  }

  const stride = info.width * bpp;
  const expectedLength = info.height * (stride + 1);
  if (inflated.length !== expectedLength) return null;

  const rows: Buffer[] = [];
  let previous: Buffer | null = null;
  let offset = 0;

  for (let y = 0; y < info.height; y += 1) {
    const filterType = inflated[offset]!;
    const filtered = inflated.subarray(offset + 1, offset + 1 + stride);
    const row = unfilterRow(filterType, filtered, previous, bpp);
    if (!row) return null;
    rows.push(row);
    previous = row;
    offset += stride + 1;
  }

  const refilteredRows: Buffer[] = [];
  previous = null;
  for (const row of rows) {
    refilteredRows.push(chooseBestFilteredRow(row, previous, bpp));
    previous = row;
  }

  const compressed = bestDeflate(Buffer.concat(refilteredRows));
  const replacementIdat = encodeChunk("IDAT", compressed);

  const outputParts: Buffer[] = [PNG_SIGNATURE];
  let insertedIdat = false;

  for (const chunk of chunks) {
    if (chunk.type === "IDAT") {
      if (!insertedIdat) {
        outputParts.push(replacementIdat);
        insertedIdat = true;
      }
      continue;
    }
    outputParts.push(chunk.raw);
  }

  const output = Buffer.concat(outputParts);
  return output.length < input.length ? output : null;
}

async function findPngs(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findPngs(fullPath)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".png")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const publicDir = path.resolve(import.meta.dirname, "../../dist/public");
  const pngFiles = await findPngs(publicDir);
  let optimizedCount = 0;
  let totalSaved = 0;

  for (const filePath of pngFiles) {
    const input = await readFile(filePath);
    if (input.length > MAX_FILE_BYTES) continue;

    const optimized = optimizePng(input);
    if (!optimized) continue;

    await writeFile(filePath, optimized);
    optimizedCount += 1;
    totalSaved += input.length - optimized.length;
    console.log(
      `[png] ${path.relative(publicDir, filePath)}: ${input.length} -> ${optimized.length} bytes`,
    );
  }

  console.log(
    `[png] losslessly optimized ${optimizedCount}/${pngFiles.length} files; saved ${totalSaved} bytes`,
  );
}

main().catch((error) => {
  console.error("Built PNG optimization failed:", error);
  process.exitCode = 1;
});
