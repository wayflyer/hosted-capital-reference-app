import { Button, Group } from "@mantine/core";

type SelectTogglersProps = {
  toggleCompanyDrawer: () => void;
  toggleUserDrawer: () => void;
};

export const SelectTogglers = ({ toggleCompanyDrawer, toggleUserDrawer }: SelectTogglersProps) => {
  const togglersConfig = [
    { text: "Select Company", handler: toggleCompanyDrawer, id: "company" },
    { text: "Select User", handler: toggleUserDrawer, id: "user" },
  ];

  return (
    <Group gap="xs" visibleFrom="sm" wrap="nowrap">
      {togglersConfig.map(({ text, handler, id }) => (
        <Button
          key={id}
          onClick={handler}
          size="xs"
          variant="outline"
        >
          {text}
        </Button>
      ))}
    </Group>
  );
};
