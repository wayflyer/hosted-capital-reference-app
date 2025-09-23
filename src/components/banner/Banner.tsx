import type { Dispatch, SetStateAction } from "react";
// import { SandboxController } from '@wf-financing/sandbox-ui';

import { PartnerCredentials } from "../partner-credentials/PartnerCredentials.tsx";
import { useEmbedCta } from '../../hooks';
import type { Theme } from "../select-theme/theme";
import type { CompanyCredentialsType } from "../../types";

type BannerProps = {
  targetId?: string;
  partnerDesignId: Theme;
  isCredentialsMissing: boolean;
  setIsCredentialsMissing: Dispatch<SetStateAction<boolean>>;
  companyToken: string;
  partnerToken: string;
  isLoading: boolean;
  updateAuthTokens: () => Promise<void>;
  companyCredentials: CompanyCredentialsType;
};

export const Banner = ({
  targetId = "ui-banner-container",
  partnerDesignId,
  companyToken,
  partnerToken,
  isCredentialsMissing,
  setIsCredentialsMissing,
  isLoading,
  updateAuthTokens,
  companyCredentials,
}: BannerProps) => {
  useEmbedCta(companyToken, targetId, partnerDesignId, isLoading);
  const companyId = companyCredentials?.company_id as string;

  return (
    <>
      <div id={targetId} />
      <PartnerCredentials
        isCredentialsMissing={isCredentialsMissing}
        setIsCredentialsMissing={setIsCredentialsMissing}
      />
      {/*<SandboxController*/}
      {/*  companyToken={companyToken}*/}
      {/*  partnerToken={partnerToken}*/}
      {/*  rerenderCta={updateAuthTokens}*/}
      {/*  companyId={companyId}*/}
      {/*/>*/}
    </>
  );
};
