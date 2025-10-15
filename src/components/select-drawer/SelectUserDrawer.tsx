import { Drawer, NavLink, Stack } from "@mantine/core";
import { useEffect, useState } from "react";

import { useLocalStorage } from "@mantine/hooks";
import { COMPANY_TOKEN_CREDENTIALS_KEY } from "../../config";
import { useCompanyUsers } from "../../hooks";
import type { CompanyCredentialsType } from "../../types";
import { generateRandomName } from "../../utils";
import { AddButton } from "./AddButton";

type SelectCompanyDrawerProps = {
  opened: boolean;
  onClose: VoidFunction;
};

export const SelectUserDrawer = ({
  opened,
  onClose,
}: SelectCompanyDrawerProps) => {
  const [companyCredentials, setCompanyCredentials] =
    useLocalStorage<CompanyCredentialsType>({
      key: COMPANY_TOKEN_CREDENTIALS_KEY,
    });
  const { data: users } = useCompanyUsers();
  const [usersList, setCredentialsList] = useState<string[]>([]);

  const selectedUser = companyCredentials?.user_id ?? null;

  const handleAddCredential = async () => {
    const newCredentialId = crypto.randomUUID();

    setCredentialsList((prevState) => [newCredentialId, ...prevState]);
  };

  useEffect(() => {
    if (users) {
      setCredentialsList(users);
    }
  }, [users]);

  useEffect(() => {
    setCompanyCredentials((prevState) => {
      if (selectedUser) {
        return { ...prevState };
      }

      if (users?.length) {
        return {
          ...prevState,
          user_id: users[0],
        };
      }

      return {
        ...prevState,
      };
    });
  }, [companyCredentials?.company_id]);

  const handleSelectCredential = (externalId: string) => {
    setCompanyCredentials((prevState) => ({
      ...prevState,
      user_id: externalId,
    }));
  };

  return (
    <Drawer.Root opened={opened} position="right" onClose={onClose}>
      <Drawer.Overlay />
      <Drawer.Content style={{ zIndex: 201 }}>
        <Drawer.Header>
          <Drawer.Title>Select User</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <Stack>
            <AddButton onClick={handleAddCredential} label="Add User" />
            {usersList.length &&
              usersList.map((externalId) => (
                <NavLink
                  key={externalId}
                  label={generateRandomName(
                    externalId,
                    "user_id",
                    companyCredentials?.company_id,
                  )}
                  active={externalId === companyCredentials?.user_id}
                  onClick={() => handleSelectCredential(externalId)}
                />
              ))}
          </Stack>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
