import { useState, useEffect } from "react";
import { NavLink, Stack } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { CiCirclePlus } from "react-icons/ci";

import { usePartnerCompanies } from "../../hooks";
import { generateRandomName } from "../../utils";
import type { CompanyCredentialsType } from "../../types";
import { COMPANY_TOKEN_CREDENTIALS_KEY } from "../../config";
import { CustomDrawer } from "./CustomDrawer.tsx";

type SelectCompanyDrawerProps = {
  opened: boolean;
  onClose: () => void;
};

export const SelectCompanyDrawer = ({
  opened,
  onClose,
}: SelectCompanyDrawerProps) => {
  const [companyCredentials, setCompanyCredentials] = useLocalStorage<CompanyCredentialsType>({ key: COMPANY_TOKEN_CREDENTIALS_KEY });
  const companies = usePartnerCompanies();
  const [credentialsList, setCredentialsList] = useState<string[]>([]);

  const handleAddCredential = () => {
    const newCredentialId = crypto.randomUUID();

    setCredentialsList(prevState => ([
      newCredentialId,
      ...prevState,
    ]));
  };

  useEffect(() => {
    if (companies.data) {
      setCredentialsList(prevState => {
        const companiesData = companies.data as string[];
        const fullList = [...prevState, ...companiesData];

        return Array.from(new Set(fullList));
      });
    }
  }, [companies.data]);

  const handleSelectCredential = (externalId: string) => {
    setCompanyCredentials({ company_id: externalId });
  }

  const addComponent = (
    <div style={{ alignItems: 'center', display: 'flex', gap: '5px' }}>
      <p>Add Company</p>
      <CiCirclePlus />
    </div>
  );

  return (
    <CustomDrawer opened={opened} onClose={onClose} title="Select Company">
      <Stack>
        <NavLink label={addComponent} onClick={handleAddCredential} />
        {credentialsList && credentialsList.map((externalId) => (
          <NavLink
            key={externalId}
            label={generateRandomName(externalId, 'company_id')}
            active={externalId === companyCredentials?.company_id}
            onClick={() => handleSelectCredential(externalId)}
          />))}
      </Stack>
    </CustomDrawer>
  );
}
