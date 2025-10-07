import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from '@mantine/hooks';

import { usePartnerToken } from "./index";
import { getPartnerCompanyUsers } from "../services";
import { COMPANY_TOKEN_CREDENTIALS_KEY, queryKeys } from "../config";
import type { CompanyCredentialsType } from "../types";

export const useCompanyUsers = () => {
  const { data: partnerTokenData } = usePartnerToken();
  const [companyCredentials, setCompanyCredentials] = useLocalStorage<CompanyCredentialsType>({ key: COMPANY_TOKEN_CREDENTIALS_KEY });

  const token = partnerTokenData?.token ?? null;
  const companyId = companyCredentials?.company_id ?? null;
  const userId = companyCredentials?.user_id ?? null;

  const companyUsersQuery = useQuery({
    queryKey: queryKeys.companyUsers(token, companyId),
    enabled: Boolean(token && companyId),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    queryFn: () => getPartnerCompanyUsers(token as string, companyId as string),
  });
  const { data: users, isError } = companyUsersQuery;

  if (!userId && companyId && users && users.length > 0) {
    const preselected = users[0] ?? crypto.randomUUID();
    setCompanyCredentials({ company_id: companyId, user_id: preselected });
  }

  if (isError && companyId && !userId) {
    const fallback = crypto.randomUUID();
    setCompanyCredentials({ company_id: companyId, user_id: fallback });
  }

  return companyUsersQuery;
};
