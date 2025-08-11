import { Drawer, NavLink, Stack } from "@mantine/core";
import { THEME_VALUES, getThemeLabel, type Theme } from "./theme";

type SelectThemeDrawerProps = {
  theme: Theme;
  opened: boolean;
  onClose: () => void;
  onSelect: (theme: Theme) => void;
};

export const SelectThemeDrawer = ({
  theme,
  opened,
  onClose,
  onSelect,
}: SelectThemeDrawerProps) => {
  const handleOnClick = (value: Theme) => {
    onSelect(value);
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
        {THEME_VALUES.map((value) => (
          <NavLink
            key={value}
            label={getThemeLabel(value)}
            active={theme === value}
            onClick={() => handleOnClick(value)}
          />
        ))}
      </Stack>
    </Drawer>
  );
};
