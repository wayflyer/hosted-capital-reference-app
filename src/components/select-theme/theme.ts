import { FONT_PARAMS, type FontParams } from "../../fonts";

export const THEME_CONFIG = {
  wayflyer: {
    label: "Wayflyer",
    font: FONT_PARAMS.merrionSans, // Merrion Sans
    appBg: "#f8f6f3",
  },
  whiteLabel: {
    label: "Whitelabel",
    font: FONT_PARAMS.dmSans, // DM Sans
    appBg: "#f8f6f3",
  },
} as const;

export type Theme = keyof typeof THEME_CONFIG;
export const THEME_VALUES = Object.keys(THEME_CONFIG) as Theme[];
export const getThemeLabel = (t: Theme) => THEME_CONFIG[t].label;
export type ThemeTokens = {
  label: string;
  font: FontParams;
  appBg: string;
};
