import { AppShell, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";

import { Header } from "./components/header/Header";
import { Navigation } from "./components/navigation/Navigation";
import { Dashboard } from "./pages/dashboard";
import { useGetCompanyToken, useManageCompanyCredentials } from "./hooks";

import {
  THEME_CONFIG,
  type Theme,
  type ThemeTokens,
} from "./components/select-theme/theme";
import { PartnerCredentials } from "./components/partner-credentials/PartnerCredentials";

export const App = () => {
  const [theme, setTheme] = useState<Theme>("whiteLabel");
  const { companyCredentials, setAndCacheCompanyCredentials } = useManageCompanyCredentials();
  const [opened, { toggle }] = useDisclosure();
  const {
    isLoading,
    companyToken,
    partnerToken,
    isCredentialsMissing,
    setIsCredentialsMissing,
    getCompanyToken,
  } = useGetCompanyToken(companyCredentials);

  const tokens: ThemeTokens = THEME_CONFIG[theme];

  return (
    <MantineProvider
      theme={{
        defaultRadius: "md",
        primaryColor: "gray",
        fontFamily: `${tokens.font.fontFamily}, sans-serif`,
        headings: {
          fontFamily: `${tokens.font.fontFamily}, sans-serif`,
          fontWeight: "600",
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
          <PartnerCredentials isCredentialsMissing={isCredentialsMissing} setIsCredentialsMissing={setIsCredentialsMissing} />
          <AppShell.Header>
            <Header
              theme={theme}
              setTheme={setTheme}
              companyCredentials={companyCredentials}
              setCompanyCredentials={setAndCacheCompanyCredentials}
              partnerToken={partnerToken}
              opened={opened}
              toggle={toggle}
            />
          </AppShell.Header>
          <AppShell.Navbar p="md">
            <Navigation />
          </AppShell.Navbar>
          <AppShell.Main bg={tokens.appBg}>
            <Dashboard
              companyToken={companyToken}
              isLoading={isLoading}
              partnerDesignId={theme}
              partnerToken={partnerToken}
              updateAuthTokens={getCompanyToken}
              companyCredentials={companyCredentials}
            />
          </AppShell.Main>
        </AppShell>
      </ModalsProvider>
    </MantineProvider>
  );
};
