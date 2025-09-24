import { Drawer, NavLink, Stack } from "@mantine/core";
import { CiCirclePlus } from "react-icons/ci";

import { useManageCredentials } from "../../hooks";
import { generateRandomName } from "../../utils";
import type { CompanyCredentialsType, CredentialSelectorType, SetAndCacheCompanyCredentials } from "../../types";

type SelectCompanyDrawerProps = {
  opened: boolean;
  onClose: () => void;
  credentials: CompanyCredentialsType;
  setCredentials: SetAndCacheCompanyCredentials;
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
    setCredentials(credential, selectorType);
  };

  const handleAddCredential = () => {
    const newCredentialId = crypto.randomUUID();
    const companyName = credentials?.company_id;

    setCredentialsList((prevState) => ([{
      externalId: newCredentialId,
      displayName: generateRandomName(newCredentialId, selectorType, companyName)
    }, ...(prevState ?? [])]));
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
        <NavLink label={addComponent} onClick={handleAddCredential} />
        {credentialsList && credentialsList.map(({ externalId, displayName }) => (
          <NavLink
            key={externalId}
            label={displayName}
            active={externalId === credentials?.[selectorType]}
            onClick={() => handleSelectCredential(externalId)}
          />))}
      </Stack>
    </Drawer>
  );
}
