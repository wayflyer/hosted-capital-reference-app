import { Group, Text } from "@mantine/core";

export type LegendItem = { label: string; color: string };

type LegendProps = {
  items: LegendItem[];
  dotSize?: number;
  gap?: number | string;
  itemGap?: number | string;
};

export const Legend = ({
  items,
  dotSize = 12,
  gap = "xl",
  itemGap = 8,
}: LegendProps) => {
  return (
    <Group gap={gap}>
      {items.map(({ label, color }) => (
        <Group key={label} gap={itemGap} align="center">
          <span
            aria-hidden
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: 9999,
              background: color,
              display: "inline-block",
            }}
          />
          <Text>{label}</Text>
        </Group>
      ))}
    </Group>
  );
};
