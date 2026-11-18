import { workSamplesTable } from "@workspace/db";
import { getTableColumns, sql } from "drizzle-orm";

/** Hash in PostgreSQL to avoid transferring every original base64 PDF for list/SSR metadata. */
const sourceBase64 = sql`regexp_replace(${workSamplesTable.fileData}, '[[:space:]]', '', 'g')`;
const sourcePayload = sql`rtrim(${sourceBase64}, '=')`;
// The upload API accepts unpadded base64. PostgreSQL decode requires canonical padding.
const canonicalBase64 = sql`rpad(${sourcePayload}, ((length(${sourcePayload}) + 3) / 4) * 4, '=')`;
export const workSourceFileSHA256 = sql<string | null>`case
  when ${workSamplesTable.published} = true
    and ${workSamplesTable.fileMimeType} = 'application/pdf'
    and ${workSamplesTable.fileSize} > 0
    and ${sourceBase64} ~ '^[A-Za-z0-9+/]+={0,2}$'
    and length(${sourcePayload}) % 4 <> 1
  then encode(sha256(decode(${canonicalBase64}, 'base64')), 'hex')
  else null end`;

const { fileData: _fileData, confidentialityConfirmed: _confidentiality, ...columns } = getTableColumns(workSamplesTable);
export const publicWorkColumns = { ...columns, sourceFileSHA256: workSourceFileSHA256 };
