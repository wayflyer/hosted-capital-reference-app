import { fetchWithAuth } from "../api";
import { GET_METHOD, PARTNER_COMPANIES_LIST_URL } from "../config";

type PartnerCompany = {
  external_id: string;
};

type CompaniesExternalIdList = {
  companies: PartnerCompany[]
};

type CompaniesIdList = string[];

type GetPartnerCompanies = (token: string) => Promise<CompaniesIdList>;

export const getPartnerCompanies: GetPartnerCompanies = async (token) => {
  const companyExternalIdList: CompaniesExternalIdList = await fetchWithAuth<null, CompaniesExternalIdList>(
    PARTNER_COMPANIES_LIST_URL,
    null, token,
    GET_METHOD
  );
  const companyIdList: CompaniesIdList = companyExternalIdList.companies.map(({ external_id }) => external_id);

  return companyIdList;
};
