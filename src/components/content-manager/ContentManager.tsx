import { PreloadScreen } from "../preload-screen/PreloadScreen.tsx";
import { usePartnerToken, usePartnerCompanies, useCompanyUsers, useCompanyToken } from "../../hooks";
import { MainContent } from '../main-content/MainContent.tsx';

export const ContentManager = () => {
  const partnerToken = usePartnerToken();
  const partnerCompanies = usePartnerCompanies();
  const companyUsers = useCompanyUsers();
  const companyToken = useCompanyToken();

  const requests = [partnerToken, partnerCompanies, companyUsers, companyToken];
  const isDataLoaded = requests.some(({ data }) => !!data);
  const isDataLoading = requests.some(({ isLoading }) => isLoading);

  return (
    <>
      {isDataLoaded
        ? <MainContent />
        : <PreloadScreen isDataLoading={isDataLoading} isError={partnerToken.isError} />
      }
    </>
  );
};