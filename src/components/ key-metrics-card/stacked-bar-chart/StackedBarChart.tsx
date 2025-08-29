import { useElementSize } from "@mantine/hooks";
import type { StackedBarDatum } from "../data";
import { useStackedBarLayout } from "./hooks/useStackedBarLayout";

type StackedBarChartProps = {
  data: StackedBarDatum[];
  height?: number;
  barPx?: number;
  minGapPx?: number;
  showGrid?: boolean;
  gridLines?: number;
  colorFirst?: string;
  colorRepeat?: string;
};

export const StackedBarChart = ({
  data,
  height = 200,
  barPx = 8,
  minGapPx = 6,
  showGrid = true,
  gridLines = 5,
  colorFirst,
  colorRepeat,
}: StackedBarChartProps) => {
  const { ref, width: containerWidth } = useElementSize();

  const margin = { top: 10, right: 12, bottom: 28, left: 12 };

  const { svgWidth, bars, labelsY } = useStackedBarLayout({
    data,
    containerWidth,
    height,
    margin,
    barPx,
    minGapPx,
  });

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

        {bars.map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={b.yRepeat}
              width={b.bw}
              height={b.hRepeat}
              rx={2}
              fill={colorRepeat}
            />
            <rect
              x={b.x}
              y={b.yFirst}
              width={b.bw}
              height={b.hFirst}
              rx={2}
              fill={colorFirst}
            />
          </g>
        ))}

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
