import { FONT_PARAMS, type FontParams } from "../../fonts";

export const THEME_CONFIG = {
  whiteLabel: {
    label: "Whitelabel",
    font: FONT_PARAMS.dmSans, // DM Sans
    appBg: "#f8f6f3",
    lightColor: "#c3edd6",
    darkColor: "#245048",
  },
  wayflyer: {
    label: "Wayflyer",
    font: FONT_PARAMS.merrionSans, // Merrion Sans
    appBg: "#f5f5fa",
    lightColor: "#cff8fe",
    darkColor: "#018394",
  },
} as const;

export type Theme = keyof typeof THEME_CONFIG;
export const THEME_VALUES = Object.keys(THEME_CONFIG) as Theme[];
export const getThemeLabel = (t: Theme) => THEME_CONFIG[t].label;
export type ThemeTokens = {
  label: string;
  font: FontParams;
  appBg: string;
  lightColor: string;
  darkColor: string;
};
