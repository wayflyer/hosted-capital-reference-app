import { fetchWithAuth } from "../api";
import { GET_METHOD, PARTNER_COMPANIES_LIST_URL } from "../config";

type PartnerCompanyType = {
  external_id: string;
};

type CompaniesExternalIdListType = {
  companies: PartnerCompanyType[]
};

type CompaniesIdListType = string[];

export const getPartnerCompanies = async (token: string) => {
  const companyExternalIdList: CompaniesExternalIdListType = await fetchWithAuth<null, CompaniesExternalIdListType>(PARTNER_COMPANIES_LIST_URL, null, token, GET_METHOD);
  const companyIdList: CompaniesIdListType = companyExternalIdList.companies.map(({ external_id }) => external_id);

  return companyIdList;
};
