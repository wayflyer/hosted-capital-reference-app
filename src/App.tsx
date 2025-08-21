import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SdkScenarios } from "@wf-financing/ui-sdk";
import { useState } from "react";
import { Header } from "./components/header/Header";
import { Navigation } from "./components/navigation/Navigation";
import type { Theme } from "./components/select-theme/theme";
import { Dashboard } from "./pages/dashboard";

export default function App() {
  const [theme, setTheme] = useState<Theme>("whiteLabel");
  const [scenario, setScenario] = useState<SdkScenarios>(
    SdkScenarios.GENERIC_NEW_APPLICATION,
  );

  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: !opened } }}
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
      <AppShell.Main bg="gray.1">
        <Dashboard scenario={scenario} partnerDesignId={theme} />
      </AppShell.Main>
    </AppShell>
  );
}
