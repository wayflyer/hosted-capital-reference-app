import { Loader, Text, Center, Stack, Paper } from '@mantine/core';

import { PartnerCredentials } from '../partner-credentials/PartnerCredentials';

type PreloadScreenProps = {
  setIsCredentialsMissing: (isCredentialsMissing: boolean) => void;
  isPartnerCredentialsMissing: boolean;
};

export const PreloadScreen = ({
  isPartnerCredentialsMissing,
  setIsCredentialsMissing,
}: PreloadScreenProps) => {

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
          {isPartnerCredentialsMissing
            ? <PartnerCredentials
                setIsCredentialsMissing={setIsCredentialsMissing}
                isCredentialsMissing={isPartnerCredentialsMissing}
              />
            : <Text size="sm">
              Preparing your content, please wait...
            </Text>
          }
        </Stack>
      </Paper>
    </Center>
  );
};