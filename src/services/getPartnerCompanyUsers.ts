import { fetchWithAuth } from "../api";
import { GET_METHOD, PARTNER_USERS_LIST_URL } from "../config";

type CompanyUser = {
  external_id: string;
  partner_id: string;
};

type CompanyUsersListResponse = {
  users: CompanyUser[];
};

type CompanyUsersListRequestType = string;

type CompanyUsersIdList = string[];

type GetPartnerCompanyUsers = (token: string, companyId: string) => Promise<CompanyUsersIdList>;

export const getPartnerCompanyUsers: GetPartnerCompanyUsers = async (token: string, companyId: string ) => {
  const urlWithCompanyId = PARTNER_USERS_LIST_URL.replace(":id", companyId);
  const usersListResponse = await fetchWithAuth<CompanyUsersListRequestType, CompanyUsersListResponse>(
    urlWithCompanyId,
    companyId,
    token,
    GET_METHOD,
  );
  const usersList: CompanyUsersIdList = usersListResponse.users.map(({ external_id }) => external_id);

  return usersList;
};