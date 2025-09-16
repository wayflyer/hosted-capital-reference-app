import { PartnerCredentials } from "../partner-credentials/PartnerCredentials.tsx";
import { useEmbedCta } from '../../hooks';
import type { Theme } from "../select-theme/theme";
import type { Dispatch, SetStateAction } from "react";

type BannerProps = {
  targetId?: string;
  partnerDesignId: Theme;
  isCredentialsMissing: boolean;
  setIsCredentialsMissing: Dispatch<SetStateAction<boolean>>;
  companyToken: string;
  isLoading: boolean;
};

export const Banner = ({
  targetId = "ui-banner-container",
  partnerDesignId,
  companyToken,
  isCredentialsMissing,
  setIsCredentialsMissing,
  isLoading,
}: BannerProps) => {
  useEmbedCta(companyToken, targetId, partnerDesignId, isLoading);

  return (
    <>
      <div id={targetId} />
      <PartnerCredentials
        isCredentialsMissing={isCredentialsMissing}
        setIsCredentialsMissing={setIsCredentialsMissing}
      />
    </>
  );
};
