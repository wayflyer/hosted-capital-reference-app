import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import { getPartnerCompanies, getPartnerCompanyUsers } from "../services";
import type { CompanyCredentialsType } from "../types";

type CredentialListType = string[] | null;

type ManageCredentialsType = (
  authToken: string,
  credentials: CompanyCredentialsType,
  selectorType: string,
  setCredentials: Dispatch<SetStateAction<CompanyCredentialsType>>
) => [
  credentialsList: CredentialListType,
  setCredentialsList: Dispatch<SetStateAction<CredentialListType>>
];

export const useManageCredentials: ManageCredentialsType = (
  authToken,
  credentials,
  selectorType,
  setCredentials,
) => {
  const [credentialsList, setCredentialsList] = useState<CredentialListType>(null);

  useEffect(() => {
    const getCompanyUsersList = async () => {
      if (authToken && credentials?.company_id && selectorType === "user_id") {
        const users = await getPartnerCompanyUsers(authToken, credentials?.company_id);
        setCredentialsList(users);

        setCredentials((previousState)=> ({
          ...(previousState ?? {}),
          [selectorType]: users[0],
        }));
      }
    }

    getCompanyUsersList();
  }, [authToken, credentials?.company_id, selectorType, setCredentials]);

  useEffect(() => {
    const getCredentialsList = async () => {
      if (authToken && selectorType === "company_id") {
        const companies = await getPartnerCompanies(authToken);
        setCredentialsList(companies);

        setCredentials((previousState)=> ({
          ...(previousState ?? {}),
          [selectorType]: companies?.[0],
        }));
      }
    }

    getCredentialsList();
  }, [authToken, selectorType, setCredentials]);

  return [credentialsList, setCredentialsList];
};
