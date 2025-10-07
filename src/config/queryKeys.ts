import type { QueryKey } from "@tanstack/react-query";

export const queryKeys = {
  partnerToken: (partnerId?: string, partnerSecret?: string): QueryKey => ["partnerToken", partnerId, partnerSecret],
  partnerCompanies: (partnerToken?: string | null): QueryKey => [
    "partnerCompanies",
    partnerToken ?? null,
  ],
  companyUsers: (partnerToken: string | null, companyId: string | null): QueryKey => [
    "companyUsers",
    partnerToken ?? null,
    companyId ?? null,
  ],
  companyToken: (
    partnerToken: string | null,
    companyId: string | null,
    userId: string | null,
  ): QueryKey => ["companyToken", partnerToken ?? null, companyId ?? null, userId ?? null],
};
