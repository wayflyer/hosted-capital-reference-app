import { Group, Text } from "@mantine/core";

export const Money = ({ amount }: { amount: number }) => {
  const abs = Math.abs(amount);
  const dollars = Math.floor(abs);
  const sign = amount > 0 ? "+$" : "$";
  const color = amount > 0 ? "teal.7" : "dark";

  return (
    <Group justify="end">
      <Text fw={500} c={color}>
        {sign}
        {dollars.toLocaleString("en-US", { maximumFractionDigits: 0 })}
      </Text>
    </Group>
  );
};
