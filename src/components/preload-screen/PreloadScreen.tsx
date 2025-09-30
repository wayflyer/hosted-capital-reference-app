import {
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

export const PreloadScreen = () => {
  const [partnerCredentials, setPartnerCredentials] = useLocalStorage<PartnerCredentials>({
    key: PARTNER_TOKEN_CREDENTIALS_KEY,
  });


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
          <Loader size="lg" variant="oval" />
          <Text size="xl">
            Welcome To Wayflyer Embedded Finance Sandbox!
          </Text>
          {!partnerCredentials
            ? <PartnerCredentialsForm setPartnerCredentials={setPartnerCredentials} />
            : <Text size="sm">
              Preparing your content, please wait...
            </Text>
          }
        </Stack>
      </Paper>
    </Center>
  );
};