import type { QueryKey } from "@tanstack/react-query";

export const queryKeys = {
  partnerToken: (partnerId?: string, partnerSecret?: string): QueryKey => ["partnerToken", partnerId, partnerSecret],
  partnerCompanies: (partnerToken?: string): QueryKey => [
    "partnerCompanies",
    partnerToken ?? null,
  ],
  companyUsers: (partnerToken: string, companies?: string[] | null, companyId?: string): QueryKey => [
    "companyUsers",
    partnerToken ?? null,
    companyId ?? null,
    companies ?? null,
  ],
  companyToken: (
    partnerToken?: string,
    companyId?: string,
    userId?: string
  ): QueryKey => ["companyToken", partnerToken ?? null, companyId ?? null, userId ?? null],
};
