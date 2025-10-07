import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from '@mantine/hooks';

import { usePartnerToken } from "./index";
import { getPartnerCompanies } from "../services";
import { COMPANY_TOKEN_CREDENTIALS_KEY, queryKeys } from "../config";
import type { CompanyCredentialsType } from "../types";

export const usePartnerCompanies = () => {
  const { data: partnerTokenData } = usePartnerToken();
  const token = partnerTokenData?.token ?? null;
  const [companyCredentials, setCompanyCredentials] = useLocalStorage<CompanyCredentialsType>({ key: COMPANY_TOKEN_CREDENTIALS_KEY });
  const companyId = companyCredentials?.company_id ?? null;

  const partnerCompaniesQuery = useQuery({
    queryKey: queryKeys.partnerCompanies(token),
    queryFn: () => getPartnerCompanies(token as string),
    enabled: Boolean(token),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const { data: companies } = partnerCompaniesQuery;

  if (!companyId && companies && companies.length > 0) {
    const preselectedCompanyId = companies[0] ?? crypto.randomUUID();
    setCompanyCredentials({ company_id: preselectedCompanyId });
  }

  return partnerCompaniesQuery;
};
