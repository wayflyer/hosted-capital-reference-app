import { useState, useEffect } from "react";

import { COMPANY_TOKEN_CREDENTIALS_KEY } from '../config';
import type { CompanyCredentialsType, SetAndCacheCompanyCredentials } from '../types';

export const useManageCompanyCredentials = () => {
  const [companyCredentials, setCompanyCredentials] = useState<CompanyCredentialsType>(null);

  const setAndCacheCompanyCredentials: SetAndCacheCompanyCredentials = (credential, credentialSelector) => {
    if (credentialSelector === 'user_id') {
      setCompanyCredentials((previousState) => {
        // console.log(previousState, 'first case');
        const newState = {
          ...(previousState ?? {}),
          [credentialSelector]: credential,
        };

        const cachedCredentials = JSON.stringify(newState);

        localStorage.setItem(COMPANY_TOKEN_CREDENTIALS_KEY, cachedCredentials);

        return newState;
      });
    } else {
      const newCredential = { company_id: credential };
      const cachedCredentials = JSON.stringify(newCredential);
      console.log(newCredential, 'second case');

      localStorage.setItem(COMPANY_TOKEN_CREDENTIALS_KEY, cachedCredentials);
      setCompanyCredentials(() => newCredential);
    }
  };

  useEffect(() => {
    const cachedCredentials = localStorage.getItem(COMPANY_TOKEN_CREDENTIALS_KEY);

    if (!cachedCredentials) return;

    try {
      const credentials = JSON.parse(cachedCredentials);

      setCompanyCredentials(credentials);
    } catch {
      console.error('Failed to parse JSON company credentials.');
    }
  }, []);

  return { companyCredentials, setAndCacheCompanyCredentials };
};
