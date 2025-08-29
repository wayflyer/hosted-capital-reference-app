import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBrandGoogle } from "@tabler/icons-react";
import type { PaymentRow } from "./data";

type Props = Pick<PaymentRow, "name" | "avatar" | "status">;

export const NameCell = ({ name, avatar, status }: Props) => {
  const isMobile = useMediaQuery("(max-width: 36em)");
  const avatarSize = isMobile ? 26 : 32;
  const iconSize = isMobile ? 14 : 18;

  const Av =
    avatar?.kind === "icon" && avatar.value === "google" ? (
      <Avatar radius="md" size={avatarSize}>
        <IconBrandGoogle size={iconSize} />
      </Avatar>
    ) : (
      <Avatar radius="md" size={avatarSize}>
        {avatar?.value ?? name[0]}
      </Avatar>
    );

  const TextBlock = (
    <>
      <Text
        fw={500}
        size={isMobile ? "sm" : "md"}
        ta={isMobile ? "center" : "left"}
        lineClamp={isMobile ? 2 : 1}
        style={{ minWidth: 0 }}
      >
        {name}
      </Text>
      {status === "cancelled" && (
        <Badge variant="light" color="#EAE9DE" size="sm">
          Cancelled
        </Badge>
      )}
    </>
  );

  return isMobile ? (
    <Stack gap={4} align="center" style={{ minWidth: 0 }}>
      {Av}
      {TextBlock}
    </Stack>
  ) : (
    <Group gap="sm" wrap="nowrap" style={{ minWidth: 0 }}>
      {Av}
      <Group gap={6} wrap="nowrap" style={{ minWidth: 0 }}>
        {TextBlock}
      </Group>
    </Group>
  );
};
