import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

import { PreloadScreen } from "../preload-screen/PreloadScreen.tsx";
import { useGetAuthTokens, useManageCompanyCredentials } from "../../hooks";
import { MainContent } from "../main-content/MainContent.tsx";
import { COMPANY_TOKEN_CREDENTIALS_KEY } from "../../config";
import { getPartnerCompanies, getPartnerCompanyUsers, getCompanyToken as requestCompanyToken } from "../../services";
import { generateRandomName } from "../../utils";

export const ContentManager = () => {
  // const [isDataLoading, setIsDataLoading] = useState(true);
  // const [isPartnerCredentialsMissing, setIsPartnerCredentialsMissing] = useState(false);
  // const partnerToken = useRequestPartnerToken(setIsPartnerCredentialsMissing);
  const [companyToken, setCompanyToken] = useState<string>('');
  const { companyCredentials, setAndCacheCompanyCredentials } = useManageCompanyCredentials();
  const [opened, { toggle }] = useDisclosure();
  const {
    isLoading,
    partnerToken,
    isCredentialsMissing,
    setIsCredentialsMissing,
    getCompanyToken,
  } = useGetAuthTokens(companyCredentials);

  useEffect(() => {
    const getCompany = async () => {
      if (partnerToken) {
        const companies = await getPartnerCompanies(partnerToken);
        //@ts-ignore
        const users = await getPartnerCompanyUsers(partnerToken, companies[0].external_id);
        //@ts-ignore
        const companyToken = await requestCompanyToken(partnerToken, users[0].external_id);

        setCompanyToken(companyToken);
      }
    }
  }, [partnerToken]);

  return (
    <>
      {!companyToken ? <PreloadScreen isPartnerCredentialsMissing={isCredentialsMissing} setIsCredentialsMissing={setIsCredentialsMissing} />
        : (
          <MainContent
            opened={opened}
            isCredentialsMissing={isCredentialsMissing}
            setIsCredentialsMissing={setIsCredentialsMissing}
            theme={"whiteLabel"}
            companyCredentials={companyCredentials}
            setCompanyCredentials={setAndCacheCompanyCredentials}
            partnerToken={partnerToken}
            toggle={toggle}
            isLoading={isLoading}
            getCompanyToken={getCompanyToken}
            companyToken={companyToken}
          />
        )}
    </>
  );
};