import { PreloadScreen } from "../preload-screen/PreloadScreen.tsx";
import {
  usePartnerToken,
  usePartnerCompanies,
  useCompanyUsers,
  useCompanyToken,
  useGetPartnerDesignId,
} from "../../hooks";
import { MainContent } from '../main-content/MainContent.tsx';
import { ThemeProvider } from "../theme-provider/ThemeProvider.tsx";

export const ContentManager = () => {
  const partnerToken = usePartnerToken();
  const partnerCompanies = usePartnerCompanies();
  const companyUsers = useCompanyUsers();
  const companyToken = useCompanyToken();
  const partnerDesignId = useGetPartnerDesignId();

  const requests = [partnerToken, partnerCompanies, companyUsers, companyToken];
  const isDataLoaded = partnerDesignId && requests.some(({ data }) => !!data);
  const isDataLoading = requests.some(({ isLoading }) => isLoading);

  return (
    <ThemeProvider theme={partnerDesignId}>
      {isDataLoaded
        ? <MainContent partnerDesignId={partnerDesignId} />
        : <PreloadScreen isDataLoading={isDataLoading} isError={partnerToken.isError} />
      }
    </ThemeProvider>
  );
};