import { SandboxController } from '@wf-financing/sandbox-ui';

import { useEmbedCta, useCompanyToken, usePartnerToken } from '../../hooks';
import { useLocalStorage } from "@mantine/hooks";
import type { CompanyCredentialsType } from "../../types";
import { COMPANY_TOKEN_CREDENTIALS_KEY } from "../../config";

export const Banner = () => {
  const targetId = 'wayflyer-sdk';
  const [companyCredentials] = useLocalStorage<CompanyCredentialsType>({ key: COMPANY_TOKEN_CREDENTIALS_KEY });
  const partnerToken = usePartnerToken();
  const companyToken = useCompanyToken();
  useEmbedCta(targetId, companyToken?.data);

  const rerenderCta = async () => {
    companyToken.refetch();
  }

  return (
    <>
      <div id={targetId} />
      {companyCredentials?.company_id && partnerToken.data?.token && companyToken.data && (
        <SandboxController
          companyToken={companyToken?.data}
          partnerToken={partnerToken.data?.token}
          rerenderCta={rerenderCta}
          companyId={companyCredentials?.company_id}
        />
      )}
    </>
  );
};
