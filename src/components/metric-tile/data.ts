export type KpiTile = { label: string; value: string; delta?: number };

export const KPI_FIXTURES: KpiTile[] = [
  { label: "Total sales", value: "$8,554", delta: 12 },
  { label: "Total transactions", value: "819", delta: 8 },
  { label: "Total spent", value: "$2,352", delta: -0.8 },
  { label: "Site visits", value: "211", delta: 2.4 },
];
