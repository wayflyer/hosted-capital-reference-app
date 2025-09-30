import { QueryClient } from '@tanstack/react-query';
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

import {
  THEME_CONFIG,
  type ThemeTokens,
} from "./components/select-theme/theme";
import { ContentManager } from "./components/content-mananager/ContentManager.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      gcTime: 24 * 60 * 60 * 1000, // 24h
    },
  },
});

const storagePersister = createAsyncStoragePersister({
  storage: window.localStorage,
});

const persistOptions = {
  persister: storagePersister,
  dehydrateOptions: {
    //@ts-ignore
    shouldDehydrateQuery: (query) => {
      const [key] = query.queryKey;
      return (
        key === "partnerToken" ||
        key === "partnerCompanies" ||
        key === "companyUsers" ||
        key === "companyToken"
      );
    },
  },
};

export const App = () => {
  const tokens: ThemeTokens = THEME_CONFIG["whiteLabel"];

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
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
    </PersistQueryClientProvider>
  );
};
