import { fetchWithAuth } from '../api';
import { POST_METHOD, COMPANY_TOKEN_URL } from '../config';
import { type CompanyCredentials as CompanyTokenRequest } from '../types';

type CompanyTokenResponse = {
  token: string;
  expires_in: number;
}

type GetCompanyToken = (companyCredentials: CompanyTokenRequest, token: string) => Promise<string>;

export const getCompanyToken: GetCompanyToken = async (companyCredentials, token) => {
  const companyTokenResponse = await fetchWithAuth<CompanyTokenRequest, CompanyTokenResponse>(
    COMPANY_TOKEN_URL,
    companyCredentials,
    token,
    POST_METHOD
  );

  return companyTokenResponse.token;
};
