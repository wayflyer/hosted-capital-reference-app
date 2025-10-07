import type { ReactNode } from 'react'
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

import { HydrationGate } from "./HydrationGate.tsx";
import { QUERY_KEYS } from '../../config';

type QueryProviderProps = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
      gcTime: 24 * 60 * 60 * 1000, // 24h
    },
  },
});

const asyncLocalStorage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const storagePersister = createAsyncStoragePersister({
  storage: asyncLocalStorage,
  key: 'rq-cache-v1',
});

const persistOptions = {
  persister: storagePersister,
  maxAge: 24 * 60 * 60 * 1000,
  buster: 'v1',
  dehydrateOptions: {
    //@ts-expect-error
    shouldDehydrateQuery: (q) => {
      const key = Array.isArray(q.queryKey) ? q.queryKey[0] : q.queryKey;
      const queryKeys = Object.values(QUERY_KEYS);

      return q.state.status === 'success' && queryKeys.includes(key);
    },
  },
};

export const QueryProvider = ({ children }: QueryProviderProps) => (
  <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
    <HydrationGate>
      {children}
    </HydrationGate>
  </PersistQueryClientProvider>
);
