import { Grid } from "@mantine/core";
import { MetricTile } from "../metric-tile/MetricTile";
import type { KpiTile } from "../metric-tile/data";

type KpiGridProps = { items: KpiTile[] };

export const KpiGrid = ({ items }: KpiGridProps) => {
  return (
    <Grid>
      {items.map((tile) => (
        <Grid.Col key={tile.label} span={{ base: 6, sm: 6, md: 3 }}>
          <MetricTile {...tile} />
        </Grid.Col>
      ))}
    </Grid>
  );
};
