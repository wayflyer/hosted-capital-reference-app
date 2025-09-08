import { SdkScenarios, } from "@wf-financing/ui-sdk";

import { useEmbedCta, useGetCompanyToken } from '../../hooks';
import type { Theme } from "../select-theme/theme";

type BannerProps = {
  targetId?: string;
  partnerDesignId: Theme;
  scenario: SdkScenarios;
};

export const Banner = ({
  targetId = "ui-banner-container",
  partnerDesignId,
}: BannerProps) => {
  const { companyToken, isLoading } = useGetCompanyToken();

  useEmbedCta(companyToken, targetId, partnerDesignId, isLoading);

  return (
    <>
      <div id={targetId} />
    </>
  );
};
