import { fetchWithAuth } from "../api";
import { POST_METHOD, COMPANY_TOKEN_URL } from '../config';
import { type CompanyCredentialsType as CompanyTokenRequestType } from "../types";

type CompanyTokenResponseType = {
  token: string;
  expires_in: number;
}

export const getCompanyToken = async (companyCredentials: CompanyTokenRequestType, token: string): Promise<string | void> => {
  if (!companyCredentials) return;

  const companyTokenResponse = await fetchWithAuth<CompanyTokenRequestType, CompanyTokenResponseType>(COMPANY_TOKEN_URL, companyCredentials, token, POST_METHOD);

  return companyTokenResponse.token;
};