import { useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from '@mantine/hooks';

import { usePartnerToken } from "./index";
import { getPartnerCompanies } from "../services";
import { COMPANY_TOKEN_CREDENTIALS_KEY, queryKeys } from "../config";
import type { CompanyCredentialsType } from "../types";

export const usePartnerCompanies = ()=> {
  const { data: partnerToken } = usePartnerToken();
  const token = partnerToken?.token ?? null;
  const [companyCredentials, setCompanyCredentials] = useLocalStorage<CompanyCredentialsType>({ key: COMPANY_TOKEN_CREDENTIALS_KEY });
  const companyId = companyCredentials?.company_id ?? null;

  const partnerCompaniesQuery = useQuery({
    queryKey: queryKeys.partnerCompanies(token),
    queryFn: () => {
      if (token) {
        return getPartnerCompanies(token);
      }

      return null;
    },
    enabled: Boolean(partnerToken),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const { data: companies } = partnerCompaniesQuery;

  useEffect(() => {
    if (companies && !companyId) {
      const preselectedCompany = companies.length ? companies[0] : crypto.randomUUID();

      setCompanyCredentials({ company_id: preselectedCompany });
    }
  }, [companyId, companies]);

  return partnerCompaniesQuery;
};
