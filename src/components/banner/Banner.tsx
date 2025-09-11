import { PartnerCredentials } from "../partner-credentials/PartnerCredentials.tsx";
import { useEmbedCta, useGetCompanyToken } from '../../hooks';
import type { Theme } from "../select-theme/theme";
import { type CompanyCredentialsType } from '../../types';

type BannerProps = {
  targetId?: string;
  partnerDesignId: Theme;
  companyCredentials: CompanyCredentialsType;
};

export const Banner = ({
  targetId = "ui-banner-container",
  partnerDesignId,
  companyCredentials,
}: BannerProps) => {
  const {
    companyToken,
    isLoading,
    setIsCredentialsMissing,
    isCredentialsMissing,
  } = useGetCompanyToken(companyCredentials);
  useEmbedCta(companyToken, targetId, partnerDesignId, isLoading);

  return (
    <>
      <div id={targetId} />
      <PartnerCredentials isCredentialsMissing={isCredentialsMissing} setIsCredentialsMissing={setIsCredentialsMissing} />
    </>
  );
};
