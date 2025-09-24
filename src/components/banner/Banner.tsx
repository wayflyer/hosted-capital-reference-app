import { SandboxController } from '@wf-financing/sandbox-ui';

import { useEmbedCta } from '../../hooks';
import type { CompanyCredentialsType } from "../../types";

type BannerProps = {
  targetId?: string;
  companyToken: string;
  partnerToken: string;
  isLoading: boolean;
  updateAuthTokens: () => Promise<void>;
  companyCredentials: CompanyCredentialsType;
};

export const Banner = ({
  targetId = "ui-banner-container",
  companyToken,
  partnerToken,
  isLoading,
  updateAuthTokens,
  companyCredentials,
}: BannerProps) => {
  useEmbedCta(companyToken, targetId, isLoading);
  const companyId = companyCredentials?.company_id as string;

  return (
    <>
      <div id={targetId} />
      <SandboxController
        companyToken={companyToken}
        partnerToken={partnerToken}
        rerenderCta={updateAuthTokens}
        companyId={companyId}
      />
    </>
  );
};
