import { PartnerCredentials } from "../partner-credentials/PartnerCredentials.tsx";
import { AppShell } from "@mantine/core";
import { Header } from "../header/Header.tsx";
import { Navigation } from "../navigation/Navigation.tsx";
import { Dashboard } from "../../pages/dashboard.tsx";
import { THEME_CONFIG, type ThemeTokens, type Theme } from "../select-theme/theme.ts";
import type { CompanyCredentialsType, SetAndCacheCompanyCredentials } from '../../types';

type MainContentProps = {
  opened: boolean;
  isCredentialsMissing: boolean;
  setIsCredentialsMissing: (isCredentialsMissing: boolean) => void;
  theme: Theme;
  companyCredentials: CompanyCredentialsType;
  setCompanyCredentials: SetAndCacheCompanyCredentials;
  partnerToken: string;
  toggle: () => void;
  isLoading: boolean;
  getCompanyToken: () => Promise<void>;
  companyToken: string;
};

export const MainContent = ({
  opened,
  isCredentialsMissing,
  theme,
  companyCredentials,
  setCompanyCredentials,
  toggle,
  partnerToken,
  getCompanyToken,
  companyToken,
  isLoading,
  setIsCredentialsMissing,
}: MainContentProps) => {
  const tokens: ThemeTokens = THEME_CONFIG[theme];

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
          companyCredentials={companyCredentials}
          setCompanyCredentials={setCompanyCredentials}
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
  );
};