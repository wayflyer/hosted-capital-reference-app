import { useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from '@mantine/hooks';

import { usePartnerToken } from "./index";
import { getPartnerCompanyUsers } from "../services";
import { COMPANY_TOKEN_CREDENTIALS_KEY, queryKeys } from "../config";
import type { CompanyCredentialsType } from "../types";

export const useCompanyUsers = () => {
  const { data: partnerToken } = usePartnerToken();
  const [companyCredentials, setCompanyCredentials] = useLocalStorage<CompanyCredentialsType>({ key: COMPANY_TOKEN_CREDENTIALS_KEY });

  const token = partnerToken?.token ?? null;
  const companyId = companyCredentials?.company_id ?? null;
  const userId = companyCredentials?.user_id ?? null;

  const companyUsersQuery = useQuery({
    queryKey: queryKeys.companyUsers(token, companyId),
    enabled: Boolean(token && companyId),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    queryFn: () => {
      if (token && companyId) {
        return getPartnerCompanyUsers(token, companyId);
      }

      return null;
    },
  });

  const { data: users, isError, error } = companyUsersQuery;

  useEffect(() => {
    if (userId || !companyId || !users) return;

    const preselected = users.length ? users[0] : crypto.randomUUID();
    setCompanyCredentials({ company_id: companyId, user_id: preselected });
  }, [users, companyId, userId, setCompanyCredentials]);

  useEffect(() => {
    if (!isError || !companyId) return;

    if (!userId) {
      const fallback = crypto.randomUUID();
      setCompanyCredentials({
        company_id: companyId,
        user_id: fallback
      });
    }
  }, [isError, error, companyId, userId, setCompanyCredentials]);

  return companyUsersQuery;
};
