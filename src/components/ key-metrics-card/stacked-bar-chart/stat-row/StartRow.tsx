import { Group, Text, Title } from "@mantine/core";

export const StatRow = ({ label, value }: { label: string; value: string }) => (
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
