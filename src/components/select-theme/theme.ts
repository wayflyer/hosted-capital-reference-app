export const THEME_CONFIG = {
  wayflyer: { label: "Wayflyer" },
  whiteLabel: { label: "Whitelabel" },
} as const;

export type Theme = keyof typeof THEME_CONFIG;
export const THEME_VALUES = Object.keys(THEME_CONFIG) as Theme[];
export const getThemeLabel = (t: Theme) => THEME_CONFIG[t].label;
