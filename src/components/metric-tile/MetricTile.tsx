import { Badge, Card, Group, Text, useMantineTheme } from "@mantine/core";

type MetricTileProps = {
  label: string;
  value: string;
  delta?: number;
};

export const MetricTile = ({ label, value, delta }: MetricTileProps) => {
  const theme = useMantineTheme();
  const { appBg } = theme.other.app;

  return (
    <Card radius="lg" p="lg">
      {delta !== undefined && (
        <Group justify="end">
          <Badge
            radius="xl"
            px="sm"
            variant="filled"
            bg={appBg}
            c="var(--mantine-color-dark-9)"
            style={{ border: "none" }}
          >
            {delta > 0 ? `+${delta}%` : `${delta}%`}
          </Badge>
        </Group>
      )}
      <Text ta="center" c="dimmed" size="sm">
        {label}
      </Text>
      <Text ta="center" fz={30} fw={500}>
        {value}
      </Text>
    </Card>
  );
};
