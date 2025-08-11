import { useDisclosure } from "@mantine/hooks";
import logo from "../../assets/logo.svg";
import { SelectScenarioDrawer } from "../select-scenario-drawer/SelectScenarioDrawer";
import { SelectThemeDrawer } from "../select-theme/SelectThemeDrawer";

import { Burger, Button, Group, Image } from "@mantine/core";
import { IconMovie } from "@tabler/icons-react";
import type { SdkScenarios } from "@wf-financing/ui-entry";
import type { Dispatch, SetStateAction } from "react";
import type { Theme } from "../select-theme/theme";

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

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div style={{ width: 150 }}>
          <Image src={logo} alt="Wayflyer" fit="contain" />
        </div>
      </Group>

      <Group>
        <Group>
          {import.meta.env.VITE_WF_MOCKED_MODE === "true" && (
            <Button
              onClick={toggleUISelectScenarioDrawer}
              variant="outline"
              leftSection={<IconMovie />}
            >
              Select Scenario
            </Button>
          )}
          <SelectScenarioDrawer
            scenario={scenario}
            opened={selectUIScenarioDrawerOpened}
            onClose={toggleUISelectScenarioDrawer}
            onSelect={setScenario}
          />
        </Group>

        <Group>
          {import.meta.env.VITE_WF_MOCKED_MODE === "true" && (
            <Button
              onClick={toggleSelectScenarioDrawer}
              variant="outline"
              leftSection={<IconMovie />}
            >
              Select Theme
            </Button>
          )}
          <SelectThemeDrawer
            theme={theme}
            onSelect={setTheme}
            opened={selectScenarioDrawerOpened}
            onClose={toggleSelectScenarioDrawer}
          />
        </Group>
      </Group>
    </Group>
  );
};
