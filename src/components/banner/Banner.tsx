import { SandboxController } from '@wf-financing/sandbox-ui';

import { useEmbedCta } from '../../hooks';
import type { CompanyCredentialsType } from "../../types";

type BannerProps = {
  targetId?: string;
  companyToken: string;
  partnerToken: string;
  updateAuthTokens: () => Promise<void>;
  companyCredentials: CompanyCredentialsType;
};

export const Banner = ({
  companyToken,
  partnerToken,
  updateAuthTokens,
  companyCredentials,
}: BannerProps) => {
  const targetId = 'wayflyer-cta';

  useEmbedCta(targetId, companyToken);
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
