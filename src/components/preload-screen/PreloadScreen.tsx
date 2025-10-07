import {
  Title,
  Loader,
  Text,
  Center,
  Stack,
  Paper,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import type { PartnerCredentials } from "../../types";
import { PARTNER_TOKEN_CREDENTIALS_KEY } from "../../config";
import { PartnerCredentialsForm } from "../partner-credentials/PartnerCredentials";
import { useEffect } from "react";

type PreloadScreenProps = {
  isDataLoading: boolean;
  isError: boolean;
};

export const PreloadScreen = ({ isDataLoading, isError }: PreloadScreenProps) => {
  const [partnerCredentials, setPartnerCredentials] = useLocalStorage<PartnerCredentials>({
    key: PARTNER_TOKEN_CREDENTIALS_KEY,
  });

  useEffect(() => {
    if (isError) {
      setPartnerCredentials({});
    }
  }, [isError]);

  return (
    <Center h="100vh" w="100vw" bg="gray.0">
      <Paper
        shadow="md"
        radius="lg"
        p="xl"
        withBorder
        style={{ textAlign: 'center' }}
      >
        <Stack align="center">
          <Title order={3}>
            Welcome to the Wayflyer Hosted Capital Sandbox
          </Title>
          {!partnerCredentials?.partnerId && !partnerCredentials?.partnerSecret
            ? <>
              <Text size="sm">Please sign in with your Partner ID and Partner Secret to access the sandbox.</Text>
              <PartnerCredentialsForm setPartnerCredentials={setPartnerCredentials} isError={isError} />
            </>
            : <Text size="sm">
              Preparing your sandbox environment…
            </Text>
          }
          {isDataLoading && <Loader size="lg" variant="oval" />}
        </Stack>
      </Paper>
    </Center>
  );
};
