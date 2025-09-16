import { fetchWithAuth } from "../api";
import { GET_METHOD, PARTNER_USERS_LIST_URL } from "../config";

type CompanyUserType = {
  external_id: string;
  partner_id: string;
};

type CompanyUsersListResponseType = {
  users: CompanyUserType[];
};

type CompanyUsersListRequestType = string;

type CompanyUsersIdListType = string[];

export const getPartnerCompanyUsers = async (token: string, companyId: string ) => {
    const urlWithCompanyId = PARTNER_USERS_LIST_URL.replace(":id", companyId);
    const usersListResponse = await fetchWithAuth<CompanyUsersListRequestType, CompanyUsersListResponseType>(urlWithCompanyId, companyId, token, GET_METHOD);
    const usersList: CompanyUsersIdListType = usersListResponse.users.map(({ external_id }) => external_id);

    return await usersList;
};
