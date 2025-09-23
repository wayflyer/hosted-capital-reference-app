import type { CredentialSelectorType } from "./credentialSelectorType.ts";

export type CompanyCredentialsType = {
  company_id?: string;
  user_id?: string;
} | null;

export type SetAndCacheCompanyCredentials = (
  newCredential: string,
  credentialSelector: CredentialSelectorType,
) => void;
