export const topRoundedRectPath = (
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) => {
  const rr = Math.max(0, Math.min(r, w / 2, h));
  if (h <= 0 || w <= 0) return "";

  return [
    `M ${x} ${y + rr}`,
    `a ${rr} ${rr} 0 0 1 ${rr} ${-rr}`,
    `h ${w - 2 * rr}`,
    `a ${rr} ${rr} 0 0 1 ${rr} ${rr}`,
    `v ${h - rr}`,
    `H ${x}`,
    `Z`,
  ].join(" ");
};
