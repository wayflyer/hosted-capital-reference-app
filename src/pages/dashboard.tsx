import { Container, Skeleton, Stack } from "@mantine/core";
import type { SdkScenarios } from "@wf-financing/ui-sdk";
import { Banner } from "../components/banner/Banner";
import type { Theme } from "../components/select-theme/theme";

type DashboardProps = {
  scenario: SdkScenarios;
  partnerDesignId: Theme;
};

export const Dashboard = ({ scenario, partnerDesignId }: DashboardProps) => {
  return (
    <Container size="xl" mt="xl">
      <Stack gap="xl">
        <Banner scenario={scenario} partnerDesignId={partnerDesignId} />

        <Skeleton visible height={20} width="25%" />
        <Skeleton visible height={400} />
        <Skeleton visible height={20} width="30%" />
        <Skeleton visible height={150} />
        <Skeleton visible height={20} width="40%" />
        <Skeleton visible height={400} />
      </Stack>
    </Container>
  );
};
