import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from '@mantine/hooks';

import { getPartnerCompanies } from "../services";
import { COMPANY_TOKEN_CREDENTIALS_KEY, queryKeys } from "../config";
import type { CompanyCredentialsType } from "../types";

export const usePartnerCompanies = (partnerToken?: string)=> {
  const [companyCredentials, setCompanyCredentials] = useLocalStorage<CompanyCredentialsType>({ key: COMPANY_TOKEN_CREDENTIALS_KEY });

  return useQuery({
    queryKey: queryKeys.partnerCompanies(partnerToken),
    queryFn: async () => {
      if (partnerToken) {
        const companies = await getPartnerCompanies(partnerToken)
        const currentCompany = companyCredentials?.company_id;

        if (!currentCompany) {
          const preselectedCompany = companies.length ? companies[0] : crypto.randomUUID();

          setCompanyCredentials({ company_id: preselectedCompany });
        }

        return companies;
      }

      return null;
    },
    enabled: !!partnerToken,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}