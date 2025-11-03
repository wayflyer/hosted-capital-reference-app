import { Container, Grid, Stack } from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";
import { KeyMetricsCard } from "../components/ key-metrics-card/KeyMetricsCard";
import { KEY_METRICS_FIXTURES } from "../components/ key-metrics-card/data";
import { Banner } from "../components/banner/Banner";
import { KpiGrid } from "../components/kpi-grid/KpiGrid";
import { KPI_FIXTURES } from "../components/metric-tile/data";
import { OnlineStoreCard } from "../components/online-store-card/OnlineStoreCard";
import { PRODUCTS_FIXTURES } from "../components/online-store-card/data";
import { RecentPaymentsCard } from "../components/recent-payments/RecentPaymentsCard";
import { RECENT_PAYMENTS_FIXTURES } from "../components/recent-payments/data";

export const Dashboard = () => {
  const isMobile = useMediaQuery("(max-width: 36em)");
  const containerStyles = isMobile ? { mt: 0, p: 0 } : { mt: "xl" };

  return (
    <Container size="xl" {...containerStyles}>
      <Stack gap="xl" style={{ marginBottom: isMobile ? 16 : 40 }}>
        <Banner />
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
