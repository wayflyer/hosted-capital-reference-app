import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";

import { useGetAuthTokens, useManageCompanyCredentials } from "./hooks";

import {
  THEME_CONFIG,
  type Theme,
  type ThemeTokens,
} from "./components/select-theme/theme";
import { MainContent } from "./components/main-content/MainContent";
import { PreloadScreen } from "./components/preload-screen/PreloadScreen.tsx";
import { ContentManager } from "./components/content-mananager/ContentManager.tsx";

const queryClient = new QueryClient();

export const App = () => {
  // const [theme, setTheme] = useState<Theme>("whiteLabel");
  // const { companyCredentials, setAndCacheCompanyCredentials } = useManageCompanyCredentials();
  // const [opened, { toggle }] = useDisclosure();
  // const {
  //   isLoading,
  //   companyToken,
  //   partnerToken,
  //   isCredentialsMissing,
  //   setIsCredentialsMissing,
  //   getCompanyToken,
  // } = useGetAuthTokens(companyCredentials);

  const tokens: ThemeTokens = THEME_CONFIG["whiteLabel"];

  return (
    <QueryClientProvider client={queryClient}>
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
        <ContentManager />
      </ModalsProvider>
    </MantineProvider>
    </QueryClientProvider>
  );
};
