import { fetchWithAuth } from "../api";
import { POST_METHOD, COMPANY_TOKEN_URL } from '../config';

type CompanyTokenRequestType = {
  company_id: string;
  user_id: string;
};

type CompanyTokenResponseType = {
  token: string;
  expires_in: number;
}

export const getCompanyToken = async (token: string): Promise<string> => {
  const payload = {
    company_id: 'mat_second_company',
    user_id: 'mat_second_user',
  };
  // TODO: test after expriration of dismissal period
  // const payload = {
  //   company_id: 'mat_company',
  //   user_id: 'mat_user',
  // };

  const companyTokenResponse = await fetchWithAuth<CompanyTokenRequestType, CompanyTokenResponseType>(COMPANY_TOKEN_URL, payload, token, POST_METHOD);

  return companyTokenResponse.token;
};