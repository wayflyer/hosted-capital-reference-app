import { PreloadScreen } from "../preload-screen/PreloadScreen.tsx";
import { usePartnerToken, usePartnerCompanies, useCompanyUsers, useCompanyToken } from "../../hooks";
import { MainContent } from '../main-content/MainContent.tsx';

export const ContentManager = () => {
  const partnerToken = usePartnerToken();
  const token = partnerToken.data?.token as string;
  const partnerCompanies = usePartnerCompanies(token);
  const companies = partnerCompanies?.data as string[];
  const companyUsers = useCompanyUsers(token, companies);
  const companyToken = useCompanyToken();
  const isDataLoaded = [partnerToken, partnerCompanies, companyUsers, companyToken].some(({ data }) => !!data);

  return (
    <>
      {!isDataLoaded
        ? <PreloadScreen />
        : <MainContent />
      }
    </>
  );
};