import { Card, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import type { StackedBarDatum } from "./data";
import { Legend } from "./legend/Legend";
import { StackedBarChart } from "./stacked-bar-chart/StackedBarChart";
import { StatRow } from "./stacked-bar-chart/stat-row/StartRow";

type KeyMetricsCardProps = {
  data: StackedBarDatum[];
  periodLabel?: string;
  totals?: { customers: string; returning: string; avgSpend: string };
};

export const KeyMetricsCard = ({
  data,
  periodLabel = "Apr 2024 – Mar 2025",
  totals = { customers: "4,909", returning: "1,921", avgSpend: "$18.32" },
}: KeyMetricsCardProps) => {
  const theme = useMantineTheme();
  const { lightColor, darkColor } = theme.other.app;

  return (
    <Card
      radius="lg"
      p="lg"
      h="100%"
      w="100%"
      style={{ display: "flex", flexDirection: "column", flex: 1 }}
    >
      <Stack gap="md">
        <div>
          <Title order={3} fw={500}>
            Key Metrics
          </Title>
          <Text c="dimmed" size="sm">
            {periodLabel}
          </Text>
        </div>
        <Legend
          items={[
            { label: "First time customers", color: lightColor },
            { label: "Repeat customers", color: darkColor },
          ]}
          dotSize={12}
          gap="xl"
          itemGap={10}
        />
        <StackedBarChart
          data={data}
          height={220}
          barPx={16}
          minGapPx={6}
          showGrid
          gridLines={5}
          colorFirst={lightColor}
          colorRepeat={darkColor}
        />
        <div style={{ marginTop: 4 }}>
          <StatRow label="Total customers" value={totals.customers} />
          <StatRow label="Total returning customers" value={totals.returning} />
          <StatRow label="Avg. spending per customer" value={totals.avgSpend} />
        </div>
      </Stack>
    </Card>
  );
};
