import { Group, Text } from "@mantine/core";

export const Money = ({ amount }: { amount: number }) => {
  const abs = Math.abs(amount);
  const dollars = Math.floor(abs);
  const cents = Math.round((abs - dollars) * 100);
  const sign = amount > 0 ? "+" : amount < 0 ? "-" : "";
  const color = amount > 0 ? "teal.7" : "dark";

  return (
    <Group gap={2}>
      <Text fw={500} c={color}>
        {sign}
        {dollars.toLocaleString("en-US", { maximumFractionDigits: 0 })}
      </Text>
      <Text c={color} size="xs" mt={6}>
        .{cents.toString().padStart(2, "0")}
      </Text>
    </Group>
  );
};
