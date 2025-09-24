import { Container, Stack } from "@mantine/core";
import { Grid } from "@mantine/core";

import { type CompanyCredentialsType } from '../types';
import { KeyMetricsCard } from "../components/ key-metrics-card/KeyMetricsCard";
import { KEY_METRICS_FIXTURES } from "../components/ key-metrics-card/data";
import { Banner } from "../components/banner/Banner";
import { KpiGrid } from "../components/kpi-grid/KpiGrid";
import { KPI_FIXTURES } from "../components/metric-tile/data";
import { OnlineStoreCard } from "../components/online-store-card/OnlineStoreCard";
import { PRODUCTS_FIXTURES } from "../components/online-store-card/data";
import { RecentPaymentsCard } from "../components/recent-payments/RecentPaymentsCard";
import { RECENT_PAYMENTS_FIXTURES } from "../components/recent-payments/data";
import type { Theme } from "../components/select-theme/theme";

type DashboardProps = {
  partnerDesignId: Theme;
  companyToken: string;
  isLoading: boolean;
  partnerToken: string;
  updateAuthTokens: () => Promise<void>;
  companyCredentials: CompanyCredentialsType;
};

export const Dashboard = ({
  companyToken,
  isLoading,
  partnerToken,
  updateAuthTokens,
  companyCredentials,
}: DashboardProps) => {
  return (
    <Container size="xl" mt="xl">
      <Stack gap="xl" style={{ marginBottom: 40 }}>
        <Banner
          companyToken={companyToken}
          partnerToken={partnerToken}
          isLoading={isLoading}
          updateAuthTokens={updateAuthTokens}
          companyCredentials={companyCredentials}
        />
      </Stack>
      <Stack gap="lg">
        <KpiGrid items={KPI_FIXTURES} />
        <Grid align="stretch" gutter="lg">
          <Grid.Col span={{ base: 12, md: 6 }} style={{ display: "flex" }}>
            <KeyMetricsCard data={KEY_METRICS_FIXTURES} />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }} style={{ display: "flex" }}>
            <OnlineStoreCard rows={PRODUCTS_FIXTURES} />
          </Grid.Col>
          <Grid.Col span={{ base: 12 }}>
            <RecentPaymentsCard rows={RECENT_PAYMENTS_FIXTURES} />
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};
