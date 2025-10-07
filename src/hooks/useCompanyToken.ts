import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from '@mantine/hooks';

import {
  usePartnerToken,
  usePartnerCompanies,
  useCompanyUsers,
} from "./index";
import { getCompanyToken } from "../services";
import { COMPANY_TOKEN_CREDENTIALS_KEY, queryKeys } from "../config";
import type { CompanyCredentialsType } from "../types";

export const useCompanyToken = () => {
  const { data: partnerToken } = usePartnerToken();
  const { data: parnteCompanies } = usePartnerCompanies();
  const { data: companyUsers } = useCompanyUsers();
  const queryClient = useQueryClient();
  const [ companyCredentials ] = useLocalStorage<CompanyCredentialsType>({ key: COMPANY_TOKEN_CREDENTIALS_KEY });

  const token  = partnerToken?.token ?? null;
  const company = companyCredentials?.company_id ?? null;
  const user    = companyCredentials?.user_id ?? null;
  const companies = parnteCompanies ?? null;
  const users = companyUsers ?? null;


  const companyTokenQuery = useQuery({
    queryKey: queryKeys.companyToken(token, company, user),
    queryFn: async () => getCompanyToken({ company_id: company!, user_id: user! }, token!),
    enabled: !!token && !!company && !!user,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { data: companyToken } = companyTokenQuery;

  useEffect(() => {
    if (companyToken && partnerToken && user && company && companies && users) {
      const isNewCompany = !companies.includes(company);
      const isNewUser = !users.includes(user);

      if (isNewCompany) {
        queryClient.refetchQueries({ queryKey: queryKeys.partnerCompanies(token), type: 'active', exact: true });
      }

      if (isNewUser) {
        queryClient.refetchQueries({ queryKey: queryKeys.companyUsers(token, company), type: 'active', exact: true });
      }
    }
  }, [companyToken]);

  return companyTokenQuery;
};
