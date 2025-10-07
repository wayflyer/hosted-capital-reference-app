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
  const { data: partnerTokenData } = usePartnerToken();
  const { data: partnerCompanies } = usePartnerCompanies();
  const { data: companyUsers } = useCompanyUsers();
  const queryClient = useQueryClient();
  const [ companyCredentials ] = useLocalStorage<CompanyCredentialsType>({ key: COMPANY_TOKEN_CREDENTIALS_KEY });

  const token = partnerTokenData?.token ?? null;
  const companyId = companyCredentials?.company_id ?? null;
  const userId = companyCredentials?.user_id ?? null;
  const companies = partnerCompanies ?? null;
  const users = companyUsers ?? null;

  const isEnabled = Boolean(token && companyId && userId);

  const companyTokenQuery = useQuery({
    queryKey: queryKeys.companyToken(token, companyId, userId),
    queryFn: () => {
      const authToken = token as string;
      const selectedCompanyId = companyId as string;
      const selectedUserId = userId as string;
      return getCompanyToken(
        { company_id: selectedCompanyId, user_id: selectedUserId },
        authToken,
      );
    },
    enabled: isEnabled,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { data: companyToken } = companyTokenQuery;

  useEffect(() => {
    if (!companyToken || !token || !companyId || !userId) return;

    if (Array.isArray(companies) && !companies.includes(companyId)) {
      queryClient.invalidateQueries({ queryKey: queryKeys.partnerCompanies(token), exact: true });
    }

    if (Array.isArray(users) && !users.includes(userId)) {
      queryClient.invalidateQueries({ queryKey: queryKeys.companyUsers(token, companyId), exact: true });
    }
  }, [companyToken, token, companyId, userId, companies, users, queryClient]);

  return companyTokenQuery;
};
