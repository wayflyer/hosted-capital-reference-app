import { useEffect, useState } from "react";
import { Drawer, NavLink, Stack } from "@mantine/core";
import { CiCirclePlus } from "react-icons/ci";

import {
  usePartnerCompanies,
  usePartnerToken,
  useCompanyUsers,
} from "../../hooks";
import { generateRandomName } from "../../utils";
import type { CompanyCredentialsType } from "../../types";
import { useLocalStorage } from "@mantine/hooks";
import { COMPANY_TOKEN_CREDENTIALS_KEY } from "../../config";

type SelectCompanyDrawerProps = {
  opened: boolean;
  onClose: () => void;
};

export const SelectUserDrawer = ({
  opened,
  onClose,
}: SelectCompanyDrawerProps) => {
  const [companyCredentials, setCompanyCredentials] = useLocalStorage<CompanyCredentialsType>({ key: COMPANY_TOKEN_CREDENTIALS_KEY });
  const partnerToken = usePartnerToken();
  const token = partnerToken.data?.token as string;
  const companies = usePartnerCompanies(token);
  const partnerCompanies = companies?.data as string[];
  const users = useCompanyUsers(token, partnerCompanies);
  const [credentialsList, setCredentialsList] = useState<string[]>([]);
  console.log(users.data);
  console.log(companyCredentials);

  const handleAddCredential = () => {
    const newCredentialId = crypto.randomUUID();

    setCredentialsList(prevState => ([
      newCredentialId,
      ...prevState,
    ]));
  };

  useEffect(() => {
    if (users.data) {
      setCredentialsList(prevState => {
        const usersData = users.data as string[];
        const fullList = [...prevState, ...usersData];

        return Array.from(new Set(fullList));
      });
    }
  }, [users.data]);

  // useEffect(() => {
  //   setCredentialsList(users?.data);
  // }, [companyCredentials?.company_id, users.data]);

  const handleSelectCredential = (externalId: string) => {
    setCompanyCredentials(prevState => ({
      ...prevState,
      user_id: externalId,
    }));
  }

  const addComponent = (
    <div style={{ alignItems: 'center', display: 'flex', gap: '5px' }}>
      <p>Add User</p>
      <CiCirclePlus />
    </div>
  );

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      title={'Select User'}
    >
      <Stack>
        <NavLink label={addComponent} onClick={handleAddCredential} />
        {credentialsList && credentialsList.map((externalId) => (
          <NavLink
            key={externalId}
            label={generateRandomName(externalId, 'user_id', companyCredentials?.company_id)}
            active={externalId === companyCredentials?.user_id}
            onClick={() => handleSelectCredential(externalId)}
          />
        ))}
      </Stack>
    </Drawer>
  );
}