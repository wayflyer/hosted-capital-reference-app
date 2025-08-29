import { Card, Group, Stack, Text, Title } from "@mantine/core";
import type { StackedBarDatum } from "./data";
import { Legend } from "./legend/Legend";
import { StackedBarChart } from "./stacked-bar-chart/StackedBarChart";

type KeyMetricsCardProps = {
  data: StackedBarDatum[];
  periodLabel?: string;
  totals?: { customers: string; returning: string; avgSpend: string };
};

const StatRow = ({ label, value }: { label: string; value: string }) => (
  <Group justify="space-between" mt={8}>
    <Text
      size="sm"
      fz="var(--font-size-sm, 15px)"
      fs="normal"
      fw={400}
      lh="150%"
    >
      {label}
    </Text>
    <Title order={4} fw={500}>
      {value}
    </Title>
  </Group>
);

export const KeyMetricsCard = ({
  data,
  periodLabel = "Apr 2024 – Mar 2025",
  totals = { customers: "4,909", returning: "1,921", avgSpend: "$18.32" },
}: KeyMetricsCardProps) => {
  const colorFirst = "#BFEAD6";
  const colorRepeat = "#2c645c";

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
            { label: "First time customers", color: colorFirst },
            { label: "Repeat customers", color: colorRepeat },
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
          colorFirst={colorFirst}
          colorRepeat={colorRepeat}
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
