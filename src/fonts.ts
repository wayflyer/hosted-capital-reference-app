export type FontParams = {
  fontFamily: string;
  fontUrl: string;
  format?: "woff2" | "truetype";
  weight?: string;
  style?: "normal";
};

export const FONT_PARAMS = {
  dmSans: {
    fontFamily: "DM Sans",
    fontUrl:
      "https://app.wayflyer.com/flyui-assets/fonts/dm-sans/DMSans-VariableFont_opsz,wght.ttf",
    format: "truetype",
    style: "normal",
  } satisfies FontParams,

  merrionSans: {
    fontFamily: "Merrion Sans",
    fontUrl:
      "https://app.wayflyer.com/flyui-assets/fonts/merrion-sans/Merrion_Sans-Medium.woff2",
    format: "woff2",
    weight: "500",
    style: "normal",
  } satisfies FontParams,
} as const;

const LOADED = new Set<string>();

export function ensureFontLoaded(p: FontParams) {
  if (LOADED.has(p.fontFamily)) return;

  const style = document.createElement("style");
  style.setAttribute("data-dynamic-font", p.fontFamily);
  style.textContent = `
@font-face {
  font-family: '${p.fontFamily}';
  src: url('${p.fontUrl}') format('${p.format ?? "woff2"}');
  font-style: ${p.style ?? "normal"};
  font-weight: ${p.weight ?? "400"};
  font-display: swap;
}
`;
  document.head.appendChild(style);
  LOADED.add(p.fontFamily);
}
