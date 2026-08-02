import { useEffect, useRef } from "react";

interface HeroPlatformCanvasProps {
  region: "sa" | "syr" | "uae";
  isRTL: boolean;
}

export function HeroPlatformCanvas({ region, isRTL }: HeroPlatformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(bounds.width * ratio));
      canvas.height = Math.max(1, Math.floor(bounds.height * ratio));

      const context = canvas.getContext("2d");
      if (!context) return;

      context.scale(ratio, ratio);
      context.clearRect(0, 0, bounds.width, bounds.height);

      const width = bounds.width;
      const height = bounds.height;
      const artX = width * 0.72;
      const gold = "rgba(180, 146, 74, 0.3)";
      const green = "rgba(13, 74, 49, 0.17)";
      const faint = "rgba(13, 74, 49, 0.075)";

      context.lineCap = "round";
      context.lineJoin = "round";

      // Connected online-platform network.
      const nodes = [
        [artX - width * 0.18, height * 0.2],
        [artX + width * 0.03, height * 0.13],
        [artX + width * 0.2, height * 0.28],
        [artX - width * 0.08, height * 0.43],
        [artX + width * 0.17, height * 0.52],
      ];
      context.strokeStyle = faint;
      context.lineWidth = 1;
      context.beginPath();
      nodes.forEach(([x, y], index) => {
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.stroke();
      nodes.forEach(([x, y], index) => {
        context.beginPath();
        context.arc(x, y, index === 3 ? 5 : 3, 0, Math.PI * 2);
        context.strokeStyle = index === 3 ? gold : green;
        context.stroke();
      });

      // Scales of justice, kept abstract and architectural.
      const scaleX = artX + width * 0.03;
      const scaleTop = height * 0.2;
      const scaleBottom = height * 0.68;
      context.strokeStyle = gold;
      context.lineWidth = 1.35;
      context.beginPath();
      context.moveTo(scaleX, scaleTop);
      context.lineTo(scaleX, scaleBottom);
      context.moveTo(scaleX - width * 0.12, scaleTop + 22);
      context.lineTo(scaleX + width * 0.12, scaleTop + 22);
      context.stroke();
      [-1, 1].forEach((side) => {
        const panX = scaleX + side * width * 0.12;
        context.beginPath();
        context.moveTo(panX, scaleTop + 22);
        context.lineTo(panX - width * 0.035, scaleTop + height * 0.13);
        context.moveTo(panX, scaleTop + 22);
        context.lineTo(panX + width * 0.035, scaleTop + height * 0.13);
        context.arc(panX, scaleTop + height * 0.13, width * 0.035, 0, Math.PI);
        context.stroke();
      });

      context.strokeStyle = green;
      context.lineWidth = 1;

      if (region === "sa" || region === "uae") {
        // Contemporary Saudi city silhouette and palm-like vertical rhythm.
        const base = height * 0.82;
        const start = width * 0.57;
        const buildingWidths = [0.038, 0.055, 0.042, 0.072, 0.044, 0.06];
        const buildingHeights = region === "uae"
          ? [0.16, 0.31, 0.22, 0.48, 0.28, 0.2]
          : [0.16, 0.28, 0.21, 0.37, 0.25, 0.18];
        let cursor = start;
        buildingWidths.forEach((fraction, index) => {
          const buildingWidth = width * fraction;
          const buildingHeight = height * buildingHeights[index];
          context.strokeRect(cursor, base - buildingHeight, buildingWidth, buildingHeight);
          context.beginPath();
          context.moveTo(cursor + buildingWidth * 0.5, base - buildingHeight);
          context.lineTo(cursor + buildingWidth * 0.5, base - buildingHeight - height * 0.035);
          context.stroke();
          cursor += buildingWidth + width * 0.014;
        });
        context.beginPath();
        context.moveTo(start - width * 0.02, base);
        context.lineTo(cursor, base);
        context.stroke();
      } else {
        // Damascene arch and layered old-city roofline.
        const base = height * 0.82;
        const archX = width * 0.72;
        const archWidth = width * 0.22;
        const archHeight = height * 0.29;
        context.beginPath();
        context.moveTo(archX - archWidth / 2, base);
        context.lineTo(archX - archWidth / 2, base - archHeight * 0.52);
        context.bezierCurveTo(
          archX - archWidth / 2,
          base - archHeight,
          archX + archWidth / 2,
          base - archHeight,
          archX + archWidth / 2,
          base - archHeight * 0.52,
        );
        context.lineTo(archX + archWidth / 2, base);
        context.stroke();
        for (let index = 0; index < 5; index += 1) {
          const roofX = width * (0.53 + index * 0.075);
          const roofY = base - height * (0.08 + (index % 2) * 0.05);
          context.strokeRect(roofX, roofY, width * 0.06, base - roofY);
        }
      }

      // Ground rules fade toward the content column.
      for (let index = 0; index < 4; index += 1) {
        context.strokeStyle = `rgba(180, 146, 74, ${0.16 - index * 0.025})`;
        context.beginPath();
        context.moveTo(width * (0.45 + index * 0.03), height * (0.88 + index * 0.025));
        context.lineTo(width * 0.97, height * (0.88 + index * 0.025));
        context.stroke();
      }
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [region]);

  return (
    <canvas
      ref={canvasRef}
      className="hero-region-canvas"
      data-region={region}
      data-direction={isRTL ? "rtl" : "ltr"}
      aria-hidden="true"
    />
  );
}
