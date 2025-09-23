import { ActionIcon, Group, Menu } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import type { CompanyCredentialsType } from "../../types";

type SelectorMenuProps = {
  toggleUserDrawer: () => void;
  toggleCompanyDrawer: () => void;
  companyCredentials: CompanyCredentialsType;
}

export const SelectorMenu = ({
  toggleUserDrawer,
  toggleCompanyDrawer,
  companyCredentials,
}: SelectorMenuProps) => {
  const usersLabel = companyCredentials?.user_id ? companyCredentials.user_id : "Select User";
  const companyLabel = companyCredentials?.company_id ? companyCredentials.company_id : "Select Company";

  const menuItemsConfig = [
    { handler: toggleCompanyDrawer, text: companyLabel, id: 'company' },
    { handler: toggleUserDrawer, text: usersLabel, id: 'user' },
  ];

  return (
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
          {menuItemsConfig.map(({ text, handler, id }) => (
            <Menu.Item key={id} onClick={handler}>
              {text}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};