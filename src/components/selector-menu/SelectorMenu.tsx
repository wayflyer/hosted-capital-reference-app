import { ActionIcon, Group, Menu } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";

type SelectorMenuProps = {
  toggleUserDrawer: () => void;
  toggleCompanyDrawer: () => void;
}

export const SelectorMenu = ({ toggleUserDrawer, toggleCompanyDrawer }: SelectorMenuProps) => {
  const menuItemsConfig = [
    { handler: toggleCompanyDrawer, text: 'Select Company', id: 'company' },
    { handler: toggleUserDrawer, text: 'Select User', id: 'user' },
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