import { useDisclosure } from "@mantine/hooks";
import { Burger, Group } from "@mantine/core";

import { SelectorMenu } from '../selector-menu/SelectorMenu';
import { SelectTogglers } from '../select-togglers/SelectTogglers';
import { SelectCompanyDrawer } from "../select-drawer/SelectCompanyDrawer";
import { SelectUserDrawer } from "../select-drawer/SelectUserDrawer";
import type { Theme } from "../select-theme/theme";
import { Logo } from "./logo/Logo";

type HeaderProps = {
  theme: Theme;
  opened: boolean;
  toggle: VoidFunction;
};

export const Header = ({
  theme,
  opened,
  toggle,
}: HeaderProps) => {
  const [selectCompanyDrawerOpened, { toggle: toggleCompanyDrawer }] =
    useDisclosure();
  const [
    selectUserDrawerOpened,
    { toggle: toggleUserDrawer },
  ] = useDisclosure();

  return (
    <Group h="100%" px="md" justify="space-between" wrap="nowrap">
      <Group gap="sm" wrap="nowrap">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Logo theme={theme} />
      </Group>
      <Group gap="xs" wrap="nowrap">
        <SelectTogglers
          toggleCompanyDrawer={toggleCompanyDrawer}
          toggleUserDrawer={toggleUserDrawer}
        />
        <SelectorMenu
          toggleUserDrawer={toggleUserDrawer}
          toggleCompanyDrawer={toggleCompanyDrawer}
        />
      </Group>
      <SelectCompanyDrawer
        opened={selectCompanyDrawerOpened}
        onClose={toggleCompanyDrawer}
      />
      <SelectUserDrawer
        opened={selectUserDrawerOpened}
        onClose={toggleUserDrawer}
      />
    </Group>
  );
};
