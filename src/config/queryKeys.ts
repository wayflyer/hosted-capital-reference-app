import type { QueryKey } from "@tanstack/react-query";

export enum QUERY_KEYS {
  PARTNER_TOKEN = "PARTNER_TOKEN",
  PARTNER_COMPANIES = "PARTNER_COMPANIES",
  COMPANY_USERS = "COMPANY_USERS",
  COMPANY_TOKEN = "COMPANY_TOKEN",
}

export const queryKeys = {
  partnerToken: (partnerId?: string, partnerSecret?: string): QueryKey => [QUERY_KEYS.PARTNER_TOKEN, partnerId, partnerSecret],
  partnerCompanies: (partnerToken?: string | null): QueryKey => [
    QUERY_KEYS.PARTNER_COMPANIES,
    partnerToken ?? null,
  ],
  companyUsers: (partnerToken: string | null, companyId: string | null): QueryKey => [
    QUERY_KEYS.COMPANY_USERS,
    partnerToken ?? null,
    companyId ?? null,
  ],
  companyToken: (
    partnerToken: string | null,
    companyId: string | null,
    userId: string | null,
  ): QueryKey => [QUERY_KEYS.COMPANY_TOKEN, partnerToken ?? null, companyId ?? null, userId ?? null],
};
