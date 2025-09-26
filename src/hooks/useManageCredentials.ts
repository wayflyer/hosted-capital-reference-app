import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import { generateRandomName, buildCredentialsList } from "../utils";
import { getPartnerCompanies, getPartnerCompanyUsers } from "../services";
import type { CompanyCredentialsType, CredentialSelectorType, SetAndCacheCompanyCredentials } from "../types";

type Credential = {
  externalId: string;
  displayName?: string;
};
type CredentialList = Credential[] | null;

type ManageCredentialsType = (
  authToken: string,
  credentials: CompanyCredentialsType,
  selectorType: CredentialSelectorType,
  setCredentials: SetAndCacheCompanyCredentials,
) => [
  credentialsList: CredentialList,
  setCredentialsList: Dispatch<SetStateAction<CredentialList>>
];

export const useManageCredentials: ManageCredentialsType = (
  authToken,
  credentials,
  selectorType,
  setCredentials,
) => {
  const [credentialsList, setCredentialsList] = useState<CredentialList>(null);

  useEffect(() => {
    if (credentialsList?.length) {
      const companyId = credentials?.company_id;
      const userId = credentials?.user_id;

      const setFirstCredentialFromList = () => {
        const firstCredential = credentialsList[0];

        setCredentials(firstCredential.externalId, selectorType);
      };

      if (!companyId || !userId) {
        setFirstCredentialFromList();
      }
    } else {
      const newUserId = [crypto.randomUUID()];
      // const newUserName = generateRandomName(newUserId, selectorType, credentials?.company_id);

      const creds = buildCredentialsList(null, newUserId, selectorType, credentials?.company_id);

      setCredentialsList(creds);
    }
  }, [credentialsList, selectorType]);

  useEffect(() => {
    const getCompanyUsersList = async () => {
      if (authToken && credentials?.company_id && selectorType === "user_id") {
        setCredentialsList(null);

        try {
          const users = await getPartnerCompanyUsers(authToken, credentials?.company_id);

          setCredentialsList((previousCredentials) => buildCredentialsList(
            previousCredentials,
            users,
            selectorType,
            credentials?.company_id,
          ));
        } catch {
          const newUserId = crypto.randomUUID();
          const newUserName = generateRandomName(newUserId, selectorType, credentials?.company_id);
          const user = {
            externalId: newUserId,
            displayName: newUserName,
          };

          setCredentialsList((previousCredentials) => (
            [
              ...(previousCredentials ?? []),
              user,
            ]
          ));
        }
      }
    }

    getCompanyUsersList();
  }, [authToken, credentials?.company_id, selectorType]);

  useEffect(() => {
    const getCredentialsList = async () => {
      if (authToken && selectorType === "company_id") {
        const companies = await getPartnerCompanies(authToken);

        setCredentialsList((previousCredentials) => buildCredentialsList(
          previousCredentials,
          companies,
          selectorType,
          credentials?.company_id,
        ));
      }
    }

    getCredentialsList();
  }, [authToken, selectorType]);

  return [credentialsList, setCredentialsList];
};
