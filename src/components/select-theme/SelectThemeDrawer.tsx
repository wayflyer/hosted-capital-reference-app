import { Button, Drawer, Stack } from "@mantine/core";
import type { Theme } from "./theme";

type SelectThemeDrawerProps = {
  theme: Theme;
  opened: boolean;
  onClose: () => void;
  onSelect: (theme: Theme) => void;
};

export const SelectThemeDrawer = ({
  opened,
  onClose,
  onSelect,
}: SelectThemeDrawerProps) => {
  const handleOnClick = (theme: Theme) => {
    onSelect(theme);
    onClose();
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      title="Select Theme"
    >
      <Stack>
        <Button onClick={() => handleOnClick("wayflyer")}>Wayflyer</Button>
        <Button onClick={() => handleOnClick("whiteLabel")}>Whitelabel</Button>
      </Stack>
    </Drawer>
  );
};
