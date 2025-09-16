import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Drawer, NavLink, Stack } from "@mantine/core";
import { CiCirclePlus } from "react-icons/ci";

import { useGetRandomNames } from '../../hooks';
import type { CompanyCredentialsType, CredentialSelectorType } from "../../types";

type SelectCompanyDrawerProps = {
  opened: boolean;
  onClose: () => void;
  credentials: CompanyCredentialsType;
  setCredentials: Dispatch<SetStateAction<CompanyCredentialsType>>;
  selectorType: CredentialSelectorType;
};

export const SelectCompanyDrawer = ({
  opened,
  onClose,
  credentials,
  setCredentials,
  selectorType,
}: SelectCompanyDrawerProps) => {
  const [companiesCount, setCompaniesCount] = useState(3);
  const [usersCount, setUsersCount] = useState(3);
  const companyValues = useGetRandomNames(companiesCount, selectorType);
  const userValues = useGetRandomNames(usersCount, selectorType);

  useEffect(() => {
    if (!credentials) setCredentials({ company_id: companyValues[0], user_id: userValues[0] });
  }, []);

  const handleSelectCredential = (credential: string) => {
    setCredentials((previousState) => {
      if (!previousState) return previousState;

      return {
        ...previousState,
        [selectorType]: credential,
      }
    });
    onClose();
  };
  const handleAddCredential = () => {
    switch (selectorType) {
      case 'company_id':
        setCompaniesCount(prev => prev + 1);
        break;
      case 'user_id':
        setUsersCount(prev => prev + 1);
        break;
      default:
        break;
    }
  };

  const selectorLabel = selectorType === 'company_id' ? 'Company' : 'User';
  const addComponent = (
    <div style={{ alignItems: 'center', display: 'flex', gap: '5px' }}>
      <p>Add {selectorLabel}</p>
      <CiCirclePlus />
    </div>
  );

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      title={`Select ${selectorLabel}`}
    >
      <Stack>
        {selectorType === 'company_id' && companyValues.map((company) => (
          <NavLink
            key={company}
            label={company}
            active={company === credentials?.[selectorType]}
            onClick={() => handleSelectCredential(company)}
          />
        ))}
        {selectorType === 'user_id' && userValues.map((user) => (
          <NavLink
            key={user}
            label={user}
            active={user === credentials?.[selectorType]}
            onClick={() => handleSelectCredential(user)}
          />
        ))}
        <NavLink label={addComponent} onClick={handleAddCredential} />
      </Stack>
    </Drawer>
  );
}
