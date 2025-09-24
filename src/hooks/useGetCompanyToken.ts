import { useEffect, useState, useMemo, useCallback } from "react";

import { getPartnerCredentials } from '../utils';
import { getPartnerToken, getCompanyToken as requestCompanyToken } from "../services";
import type { CompanyCredentialsType } from "../types";

export const useGetCompanyToken = (companyCredentials: CompanyCredentialsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [companyToken, setCompanyToken] = useState('');
  const [partnerToken, setPartnerToken] = useState('');
  const [isCredentialsMissing, setIsCredentialsMissing] = useState(false);

  const partnerCredentials = useMemo(() => {
    return getPartnerCredentials();
  }, [isCredentialsMissing]);

  const updateAuthTokens = useCallback(async () => {
    try {
      setIsLoading(true);
      if (partnerCredentials && !partnerToken) {
        const { partnerId, partnerSecret } = partnerCredentials;
        const requestedPartnerToken = await getPartnerToken(partnerId, partnerSecret);
        setPartnerToken(requestedPartnerToken);
      }

      if (partnerToken && companyCredentials) {
        const requestedCompanyToken = await requestCompanyToken(companyCredentials, partnerToken);
        setCompanyToken(requestedCompanyToken);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [partnerToken, partnerCredentials, companyCredentials]);

  useEffect(() => {
    if (partnerCredentials?.partnerId && partnerCredentials?.partnerSecret) {
      updateAuthTokens();
    } else {
      setIsCredentialsMissing(true);
    }
  }, [updateAuthTokens, partnerCredentials?.partnerId, partnerCredentials?.partnerSecret]);

  return {
    isLoading,
    partnerToken,
    companyToken,
    isCredentialsMissing,
    setIsCredentialsMissing,
    updateAuthTokens,
  };
};
