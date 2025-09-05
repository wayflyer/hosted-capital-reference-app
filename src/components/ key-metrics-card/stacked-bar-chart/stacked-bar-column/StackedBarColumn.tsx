import { topRoundedRectPath } from "../utils";

export type ComputedBar = {
  x: number;
  bw: number;
  yFirst: number;
  hFirst: number;
  yRepeat: number;
  hRepeat: number;
  label: string;
};

type StackedBarColumnProps = {
  bar: ComputedBar;
  colorFirst: string;
  colorRepeat: string;
  roundedRadius: number;
};

export const StackedBarColumn = ({
  bar: b,
  colorFirst,
  colorRepeat,
  roundedRadius,
}: StackedBarColumnProps) => {
  const hasRepeat = b.hRepeat > 0.0001;

  const topH = hasRepeat ? b.hRepeat : b.hFirst;
  const topY = hasRepeat ? b.yRepeat : b.yFirst;
  const topFill = hasRepeat ? colorRepeat : colorFirst;

  const bottomH = hasRepeat ? b.hFirst : 0;
  const bottomY = hasRepeat ? b.yFirst : 0;
  const bottomFill = hasRepeat ? colorFirst : undefined;

  return (
    <g>
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
};
