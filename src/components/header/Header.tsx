import type { Dispatch, SetStateAction } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Group } from "@mantine/core";

import { SelectorMenu } from '../selector-menu/SelectorMenu';
import { SelectTogglers } from '../select-togglers/SelectTogglers';
import { SelectCompanyDrawer } from "../select-company-drawer/SelectCompanyDrawer";
import type { Theme } from "../select-theme/theme";
import { Logo } from "./logo/Logo";
import type { CompanyCredentialsType, SetAndCacheCompanyCredentials } from '../../types';

type HeaderProps = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  opened: boolean;
  toggle: () => void;
  companyCredentials: CompanyCredentialsType;
  setCompanyCredentials: SetAndCacheCompanyCredentials;
  partnerToken: string;
};

export const Header = ({
  theme,
  opened,
  toggle,
  setCompanyCredentials,
  companyCredentials,
  partnerToken,
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
          companyCredentials={companyCredentials}
          toggleCompanyDrawer={toggleCompanyDrawer}
          toggleUserDrawer={toggleUserDrawer}
        />
        <SelectorMenu
          companyCredentials={companyCredentials}
          toggleUserDrawer={toggleUserDrawer}
          toggleCompanyDrawer={toggleCompanyDrawer}
        />
      </Group>
      <SelectCompanyDrawer
        authToken={partnerToken}
        credentials={companyCredentials}
        setCredentials={setCompanyCredentials}
        opened={selectCompanyDrawerOpened}
        onClose={toggleCompanyDrawer}
        selectorType="company_id"
      />
      <SelectCompanyDrawer
        authToken={partnerToken}
        credentials={companyCredentials}
        setCredentials={setCompanyCredentials}
        opened={selectUserDrawerOpened}
        onClose={toggleUserDrawer}
        selectorType="user_id"
      />
    </Group>
  );
};
