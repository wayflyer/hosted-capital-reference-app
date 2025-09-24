import { Button, Group } from "@mantine/core";
import type { CompanyCredentialsType } from "../../types";

import { generateRandomName } from "../../utils";

type SelectTogglersProps = {
  toggleCompanyDrawer: () => void;
  toggleUserDrawer: () => void;
  companyCredentials: CompanyCredentialsType;
};

export const SelectTogglers = ({
  toggleCompanyDrawer,
  toggleUserDrawer,
  companyCredentials,
}: SelectTogglersProps) => {
  const usersLabel = companyCredentials?.user_id
    ? generateRandomName(companyCredentials.user_id, "user_id", companyCredentials?.company_id)
    : "Select User";
  const companyLabel = companyCredentials?.company_id
    ? generateRandomName(companyCredentials.company_id, "company_id", companyCredentials?.company_id)
    : "Select Company";

  const togglersConfig = [
    { text: companyLabel, handler: toggleCompanyDrawer, id: "company" },
    { text: usersLabel, handler: toggleUserDrawer, id: "user" },
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
