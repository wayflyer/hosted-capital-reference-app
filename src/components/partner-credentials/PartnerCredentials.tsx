import { useState, type ChangeEvent } from "react";
import {
  Button,
  Paper,
  PasswordInput,
  TextInput,
  Alert,
} from "@mantine/core";
import { IconInfoCircle } from '@tabler/icons-react';

import type { PartnerCredentials } from "../../types";

type PartnerCredentialsProps = {
  setPartnerCredentials: (val: (PartnerCredentials | ((prevState: PartnerCredentials) => PartnerCredentials))) => void;
  isError: boolean;
};

const LoginAlert = () => {
  const icon = <IconInfoCircle />;

  return (
    <Alert variant="light" color="red" title="Invalid Partner ID or Secret. Please check your credentials and try again." icon={icon} />
  );
};

export const PartnerCredentialsForm = ({ setPartnerCredentials, isError }: PartnerCredentialsProps) => {
  const [credentials, setCredentials] = useState({ partnerId: '', partnerSecret: '' });
  const isAddCredentialsDisabled = !credentials.partnerId || !credentials.partnerSecret;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, inputType: string) => {
    setCredentials((prevState) => ({
      ...prevState,
      [inputType]: event.target.value,
    }));
  };

  const handleAddCredential = () => {
    setPartnerCredentials(credentials);
  }

  return (
    <Paper withBorder shadow="sm" p={22} mt={30} radius="md" w="100%">
      {isError && <LoginAlert />}
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
        Connect
      </Button>
    </Paper>
  );
};
