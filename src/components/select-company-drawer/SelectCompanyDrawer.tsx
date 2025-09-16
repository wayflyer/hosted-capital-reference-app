import type { Dispatch, SetStateAction } from "react";
import { Drawer, NavLink, Stack } from "@mantine/core";
import { CiCirclePlus } from "react-icons/ci";

import { useManageCredentials } from "../../hooks";
import { generateRandomName } from '../../utils';
import type { CompanyCredentialsType, CredentialSelectorType } from "../../types";

type SelectCompanyDrawerProps = {
  opened: boolean;
  onClose: () => void;
  credentials: CompanyCredentialsType;
  setCredentials: Dispatch<SetStateAction<CompanyCredentialsType>>;
  selectorType: CredentialSelectorType;
  authToken: string;
};

export const SelectCompanyDrawer = ({
  opened,
  onClose,
  credentials,
  setCredentials,
  selectorType,
  authToken,
}: SelectCompanyDrawerProps) => {
  const [credentialsList, setCredentialsList] = useManageCredentials(
    authToken,
    credentials,
    selectorType,
    setCredentials,
  );

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
    setCredentialsList((prevState) => {
      if (!prevState) return [generateRandomName(0, selectorType)];

      const newCredentialId = prevState.length + 1;

      if (selectorType === 'user_id') {
        const companyName = credentials?.company_id;

        return [...prevState, generateRandomName(newCredentialId, selectorType, companyName)];
      }

      return [...prevState, generateRandomName(newCredentialId, selectorType)];
    });
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
        {credentialsList && credentialsList.map((externalId) => (
          <NavLink
            key={externalId}
            label={externalId}
            active={externalId === credentials?.[selectorType]}
            onClick={() => handleSelectCredential(externalId)}
          />))}
        <NavLink label={addComponent} onClick={handleAddCredential} />
      </Stack>
    </Drawer>
  );
}
