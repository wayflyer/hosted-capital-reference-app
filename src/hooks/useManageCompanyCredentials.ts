import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import { getPartnerCompanies, getPartnerCompanyUsers } from "../services";
import type { CompanyCredentials, CredentialSelector } from "../types";

type CredentialList = string[] | null;

type ManageCredentials = (
  authToken: string,
  credentials: CompanyCredentials,
  selectorType: CredentialSelector,
  setCredentials: Dispatch<SetStateAction<CompanyCredentials>>
) => [
  credentialsList: CredentialList,
  setCredentialsList: Dispatch<SetStateAction<CredentialList>>
];

export const useManageCompanyCredentials: ManageCredentials = (
  authToken,
  credentials,
  selectorType,
  setCredentials,
) => {
  const [credentialsList, setCredentialsList] = useState<CredentialList>(null);

  useEffect(() => {
    const getCompanyUsersList = async () => {
      if (authToken && credentials?.company_id && selectorType === "user_id") {
        try {
          const users = await getPartnerCompanyUsers(authToken, credentials?.company_id);
          setCredentialsList(users);

          setCredentials((previousState)=> ({
            ...(previousState ?? {}),
            [selectorType]: users[0],
          }));
        } catch (error) {
          console.error(error);
        }
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
