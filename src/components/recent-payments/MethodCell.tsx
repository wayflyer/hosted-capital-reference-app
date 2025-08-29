import { Group, Text } from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCreditCard,
} from "@tabler/icons-react";
import type { PaymentRow } from "./data";

export const MethodCell = ({ method }: { method: PaymentRow["method"] }) => {
  const baseProps = { size: 18, stroke: 1.75 } as const;

  switch (method.type) {
    case "wire":
      return (
        <Group gap="xs">
          <IconCreditCard {...baseProps} />
          <Text> {method.label ?? "Wire"} </Text>
        </Group>
      );
    case "transfer_out":
      return (
        <Group gap="xs">
          <IconArrowLeft {...baseProps} />
          <Text> {method.label ?? "Transfer out"} </Text>
        </Group>
      );
    case "transfer_in":
      return (
        <Group gap="xs">
          <IconArrowRight {...baseProps} />
          <Text> {method.label ?? "Transfer in"} </Text>
        </Group>
      );
    case "card":
      return (
        <Group gap="xs">
          <IconCreditCard {...baseProps} />
          <Text> {method.label ?? "Card"} </Text>
        </Group>
      );
  }
};
