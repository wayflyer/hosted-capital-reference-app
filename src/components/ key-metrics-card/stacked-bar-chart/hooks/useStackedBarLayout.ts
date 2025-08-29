import { useMemo } from "react";
import type { StackedBarDatum } from "../../data";

export type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type BarLayout = {
  x: number;
  bw: number;
  yFirst: number;
  hFirst: number;
  yRepeat: number;
  hRepeat: number;
  label: string;
};

export function useStackedBarLayout(args: {
  data: StackedBarDatum[];
  containerWidth: number;
  height: number;
  margin: Margin;
  barPx: number;
  minGapPx: number;
}) {
  const { data, containerWidth, height, margin, barPx, minGapPx } = args;

  return useMemo(() => {
    const W = Math.max(containerWidth || 0, 360);
    const innerW = Math.max(0, W - margin.left - margin.right);
    const step = data.length > 0 ? innerW / data.length : 0;

    const bw = Math.max(2, Math.min(barPx, Math.max(2, step - minGapPx)));

    const maxY = Math.max(
      1,
      ...data.map((d) => (d.first || 0) + (d.repeat || 0)),
    );
    const innerH = height - margin.top - margin.bottom;

    const bars: BarLayout[] = data.map((d, i) => {
      const xCenter = margin.left + i * step + step / 2;
      const x = xCenter - bw / 2;

      const hFirst = ((d.first || 0) / maxY) * innerH;
      const hRepeat = ((d.repeat || 0) / maxY) * innerH;

      const yBottom = height - margin.bottom;
      const yFirst = yBottom - hFirst;
      const yRepeat = yBottom - (hFirst + hRepeat);

      return { x, bw, yFirst, hFirst, yRepeat, hRepeat, label: d.label };
    });

    return {
      svgWidth: W,
      bars,
      labelsY: height - 8,
    };
  }, [
    containerWidth,
    data,
    height,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
    barPx,
    minGapPx,
  ]);
}
