import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from '@mantine/hooks';

import { usePartnerToken } from "./usePartnerToken.ts";
import { getCompanyToken } from "../services";
import { COMPANY_TOKEN_CREDENTIALS_KEY, queryKeys } from "../config";
import type { CompanyCredentialsType } from "../types";

export const useCompanyToken = () => {
  const partnerToken = usePartnerToken();
  const [companyCredentials] = useLocalStorage<CompanyCredentialsType>({ key: COMPANY_TOKEN_CREDENTIALS_KEY });
  const company = companyCredentials?.company_id;
  const user = companyCredentials?.user_id;

  return useQuery({
    queryKey: queryKeys.companyToken(partnerToken.data?.token, company, user),
    queryFn: async () => {
      if (partnerToken.data?.token) {
        return await getCompanyToken(companyCredentials, partnerToken.data?.token)
      }

      return null;
    },
    enabled: !!partnerToken && !!company && !!user,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
