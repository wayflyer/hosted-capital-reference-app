import { AppShell, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { SdkScenarios } from "@wf-financing/ui-sdk";
import { useEffect, useState } from "react";

import { Header } from "./components/header/Header";
import { Navigation } from "./components/navigation/Navigation";
import { Dashboard } from "./pages/dashboard";

import {
  THEME_CONFIG,
  type Theme,
  type ThemeTokens,
} from "./components/select-theme/theme";
import { ensureFontLoaded } from "./fonts";

export const App = () => {
  const [theme, setTheme] = useState<Theme>("whiteLabel");
  const [scenario, setScenario] = useState<SdkScenarios>(
    SdkScenarios.GENERIC_NEW_APPLICATION,
  );
  const [opened, { toggle }] = useDisclosure();

  const tokens: ThemeTokens = THEME_CONFIG[theme];

  useEffect(() => {
    ensureFontLoaded(tokens.font);
  }, [tokens.font]);

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
        <AppShell
          header={{ height: { base: 72, sm: 60 } }}
          navbar={{
            width: 200,
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header>
            <Header
              theme={theme}
              setTheme={setTheme}
              scenario={scenario}
              setScenario={setScenario}
              opened={opened}
              toggle={toggle}
            />
          </AppShell.Header>
          <AppShell.Navbar p="md">
            <Navigation />
          </AppShell.Navbar>
          <AppShell.Main bg={tokens.appBg}>
            <Dashboard scenario={scenario} partnerDesignId={theme} />
          </AppShell.Main>
        </AppShell>
      </ModalsProvider>
    </MantineProvider>
  );
};
