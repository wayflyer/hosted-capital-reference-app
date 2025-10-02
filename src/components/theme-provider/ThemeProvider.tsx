import type { ReactNode } from 'react'
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import { THEME_CONFIG, type ThemeTokens } from "../select-theme/theme";

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const tokens: ThemeTokens = THEME_CONFIG["whiteLabel"];

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
