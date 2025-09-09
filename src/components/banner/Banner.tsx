import { SdkScenarios, } from "@wf-financing/ui-sdk";

import { PartnerCredentials } from "../partner-credentials/PartnerCredentials.tsx";
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
  const {
    companyToken,
    isLoading,
    setIsCredentialsMissing,
    isCredentialsMissing
  } = useGetCompanyToken();

  useEmbedCta(companyToken, targetId, partnerDesignId, isLoading);

  return (
    <>
      <div id={targetId} />
      <PartnerCredentials isCredentialsMissing={isCredentialsMissing} setIsCredentialsMissing={setIsCredentialsMissing} />
    </>
  );
};
