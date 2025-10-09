import { useState } from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Header } from "../header/Header.tsx";
import { Navigation } from "../navigation/Navigation.tsx";
import { Dashboard } from "../../pages/dashboard.tsx";
import { THEME_CONFIG, type ThemeTokens, type Theme } from "../select-theme/theme.ts";

type MainContentProps = {
  partnerDesignId: Theme;
}

export const MainContent = ({ partnerDesignId }: MainContentProps) => {
  const [theme] = useState<Theme>(partnerDesignId);

  const tokens: ThemeTokens = THEME_CONFIG[theme];
  const [opened, { toggle }] = useDisclosure();

  return (
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
          opened={opened}
          toggle={toggle}
        />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navigation />
      </AppShell.Navbar>
      <AppShell.Main bg={tokens.appBg}>
        <Dashboard />
      </AppShell.Main>
    </AppShell>
  );
};