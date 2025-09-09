import { useState, useEffect, type ChangeEvent } from "react";
import {
  Button,
  Paper,
  PasswordInput,
  TextInput,
  Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { PARTNER_TOKEN_CREDENTIALS_KEY } from '../../config';

type PartnerCredentialsProps = {
  setIsCredentialsMissing: (isCredentialsMissing: boolean) => void;
  isCredentialsMissing: boolean;
};

export const PartnerCredentials = ({ setIsCredentialsMissing, isCredentialsMissing }: PartnerCredentialsProps) => {
  const [credentials, setCredentials] = useState({ partnerId: '', partnerSecret: '' });
  const [opened, { open, close }] = useDisclosure(isCredentialsMissing);

  const isAddCredentialsDisabled = !credentials.partnerId || !credentials.partnerSecret;

  useEffect(() => {
    if (isCredentialsMissing) {
      open();
    }
  }, [isCredentialsMissing]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, inputType: string) => {
    setCredentials((prevState) => ({
      ...prevState,
      [inputType]: event.target.value,
    }));
  };

  const handleAddCredential = () => {
    localStorage.setItem(PARTNER_TOKEN_CREDENTIALS_KEY, JSON.stringify(credentials));
    setIsCredentialsMissing(false);
    close();
  }

  return (
    <Modal opened={opened} onClose={close} withCloseButton={false} title={'Credentials'}>
      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TextInput
          onChange={(event) => handleInputChange(event, 'partnerId')}
          value={credentials.partnerId}
          label="Partner ID"
          placeholder="partner_id"
          required
          radius="sm"
        />
        <PasswordInput
          onChange={(event) => handleInputChange(event, 'partnerSecret')}
          value={credentials.partnerSecret}
          label="Partner Secret"
          placeholder="partner_secret"
          required mt="md"
          radius="sm"
        />
        <Button
          disabled={isAddCredentialsDisabled}
          onClick={handleAddCredential}
          fullWidth mt="xl"
          radius="md"
        >
          Add credentials
        </Button>
      </Paper>
    </Modal>
  );
};