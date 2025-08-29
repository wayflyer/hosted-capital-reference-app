import { useDisclosure } from "@mantine/hooks";
import { SelectScenarioDrawer } from "../select-scenario-drawer/SelectScenarioDrawer";
import { SelectThemeDrawer } from "../select-theme/SelectThemeDrawer";

import { ActionIcon, Burger, Button, Group, Menu } from "@mantine/core";
import { IconDotsVertical, IconMovie, IconPalette } from "@tabler/icons-react";
import type { SdkScenarios } from "@wf-financing/ui-sdk";
import type { Dispatch, SetStateAction } from "react";
import type { Theme } from "../select-theme/theme";
import { Logo } from "./logo/Logo";

type HeaderPropsp = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  scenario: SdkScenarios;
  setScenario: Dispatch<SetStateAction<SdkScenarios>>;
  opened: boolean;
  toggle: () => void;
};

export const Header = ({
  theme,
  setTheme,
  scenario,
  setScenario,
  opened,
  toggle,
}: HeaderPropsp) => {
  const [selectScenarioDrawerOpened, { toggle: toggleSelectScenarioDrawer }] =
    useDisclosure();
  const [
    selectUIScenarioDrawerOpened,
    { toggle: toggleUISelectScenarioDrawer },
  ] = useDisclosure();

  const mocked = import.meta.env.VITE_WF_MOCKED_MODE === "true";

  return (
    <Group h="100%" px="md" justify="space-between" wrap="nowrap">
      <Group gap="sm" wrap="nowrap">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Logo theme={theme} />
      </Group>
      {mocked && (
        <Group gap="xs" wrap="nowrap">
          <Group gap="xs" visibleFrom="sm" wrap="nowrap">
            <Button
              size="xs"
              variant="outline"
              leftSection={<IconMovie size={16} />}
              onClick={toggleUISelectScenarioDrawer}
            >
              Select Scenario
            </Button>
            <Button
              size="xs"
              variant="outline"
              leftSection={<IconPalette size={16} />}
              onClick={toggleSelectScenarioDrawer}
            >
              Select Theme
            </Button>
          </Group>
          <Group hiddenFrom="sm">
            <Menu position="bottom-end" withinPortal>
              <Menu.Target>
                <ActionIcon
                  variant="light"
                  size="lg"
                  aria-label="More actions"
                  radius="md"
                >
                  <IconDotsVertical size={18} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconMovie size={16} />}
                  onClick={toggleUISelectScenarioDrawer}
                >
                  Select Scenario
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconPalette size={16} />}
                  onClick={toggleSelectScenarioDrawer}
                >
                  Select Theme
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      )}
      <SelectScenarioDrawer
        scenario={scenario}
        opened={selectUIScenarioDrawerOpened}
        onClose={toggleUISelectScenarioDrawer}
        onSelect={setScenario}
      />
      <SelectThemeDrawer
        theme={theme}
        onSelect={setTheme}
        opened={selectScenarioDrawerOpened}
        onClose={toggleSelectScenarioDrawer}
      />
    </Group>
  );
};
