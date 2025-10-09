import type { ReactNode } from 'react'
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import { THEME_CONFIG, type ThemeTokens, type Theme } from "../select-theme/theme";

type ThemeProviderProps = {
  children: ReactNode;
  theme: Theme | null;
};

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
  const defaultTheme = 'whiteLabel';
  const selectedTheme = theme || defaultTheme;
  const tokens: ThemeTokens = THEME_CONFIG[selectedTheme];

  return (
    <MantineProvider
      theme={{
        defaultRadius: "md",
        primaryColor: "gray",
        fontFamily: `${tokens.font.fontFamily}, sans-serif`,
        headings: {
          fontFamily: `${tokens.font.fontFamily}, sans-serif`,
          fontWeight: "500",
        },
        other: {
          app: {
            tokens,
            appBg: tokens.appBg,
            lightColor: tokens.lightColor,
            darkColor: tokens.darkColor,
          },
        },
      }}
    >
      <ModalsProvider>
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
};
