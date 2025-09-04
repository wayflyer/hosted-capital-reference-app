import { useElementSize } from "@mantine/hooks";
import React, { useMemo } from "react";
import { topRoundedRectPath } from "./utils";

export type StackedBarDatum = {
  label: string;
  first: number;
  repeat: number;
};

type Margin = { top: number; right: number; bottom: number; left: number };

export type StackedBarChartProps = {
  data: StackedBarDatum[];
  height?: number;
  barPx?: number;
  minGapPx?: number;
  showGrid?: boolean;
  gridLines?: number;
  colorFirst?: string;
  colorRepeat?: string;
  roundedRadius?: number;
  margin?: Margin;
};

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  height = 200,
  barPx = 8,
  minGapPx = 6,
  showGrid = true,
  gridLines = 5,
  colorFirst = "#C8D1FA",
  colorRepeat = "#91A7FF",
  roundedRadius = 2,
  margin = { top: 10, right: 12, bottom: 28, left: 12 },
}) => {
  const { ref, width: containerWidth } = useElementSize();

  const { svgWidth, bars, labelsY } = useMemo(() => {
    const W = Math.max(containerWidth || 0, 360);
    const innerW = Math.max(0, W - margin.left - margin.right);

    const count = data.length;
    const step = count > 0 ? innerW / count : 0;

    const bw = Math.max(2, Math.min(barPx, Math.max(2, step - minGapPx)));

    const maxY =
      Math.max(1, ...data.map((d) => (d.first || 0) + (d.repeat || 0))) || 1;

    const innerH = Math.max(0, height - margin.top - margin.bottom);
    const yBottom = height - margin.bottom;

    const bars = data.map((d, i) => {
      const xCenter = margin.left + i * step + step / 2;
      const x = xCenter - bw / 2;

      const hFirst = ((d.first || 0) / maxY) * innerH;
      const hRepeat = ((d.repeat || 0) / maxY) * innerH;

      const yFirst = yBottom - hFirst;
      const yRepeat = yBottom - (hFirst + hRepeat);

      return { x, bw, yFirst, hFirst, yRepeat, hRepeat, label: d.label };
    });

    return {
      svgWidth: W,
      bars,
      labelsY: height - 8,
    };
  }, [containerWidth, data, height, barPx, minGapPx, margin]);

  return (
    <div ref={ref} style={{ width: "100%" }}>
      <svg
        viewBox={`0 0 ${svgWidth} ${height}`}
        width="100%"
        height={height}
        style={{ display: "block" }}
        aria-hidden
      >
        {showGrid &&
          Array.from({ length: gridLines }).map((_, i) => {
            const y =
              margin.top +
              ((height - margin.top - margin.bottom) * (i + 1)) / gridLines;
            return (
              <line
                key={i}
                x1={margin.left}
                x2={svgWidth - margin.right}
                y1={y}
                y2={y}
                stroke="#EAE9DE"
                strokeWidth={1}
              />
            );
          })}

        {bars.map((b, i) => {
          const hasRepeat = b.hRepeat > 0.0001;

          const topH = hasRepeat ? b.hRepeat : b.hFirst;
          const topY = hasRepeat ? b.yRepeat : b.yFirst;
          const topFill = hasRepeat ? colorRepeat : colorFirst;

          const bottomH = hasRepeat ? b.hFirst : 0;
          const bottomY = hasRepeat ? b.yFirst : 0;
          const bottomFill = hasRepeat ? colorFirst : undefined;

          return (
            <g key={i}>
              {bottomH > 0 && (
                <rect
                  x={b.x}
                  y={bottomY}
                  width={b.bw}
                  height={bottomH}
                  fill={bottomFill}
                />
              )}

              {topH > 0 && (
                <path
                  d={topRoundedRectPath(b.x, topY, b.bw, topH, roundedRadius)}
                  fill={topFill}
                />
              )}
            </g>
          );
        })}

        {bars.map((b, i) => (
          <text
            key={b.label + i}
            x={b.x + b.bw / 2}
            y={labelsY}
            fontSize="10"
            textAnchor="middle"
            fill="#6B7280"
          >
            {b.label}
          </text>
        ))}
      </svg>
    </div>
  );
};
