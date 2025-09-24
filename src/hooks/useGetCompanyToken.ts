import { useEffect, useState, useMemo, useCallback } from "react";

import { getPartnerCredentials } from '../utils';
import { getPartnerToken as requestPartnerToken, getCompanyToken as requestCompanyToken } from "../services";
import type { CompanyCredentialsType } from "../types";

export const useGetCompanyToken = (companyCredentials: CompanyCredentialsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [companyToken, setCompanyToken] = useState('');
  const [partnerToken, setPartnerToken] = useState('');
  const [isCredentialsMissing, setIsCredentialsMissing] = useState(false);

  const partnerCredentials = useMemo(() => {
    return getPartnerCredentials();
  }, [isCredentialsMissing]);

  const getPartnerToken = useCallback(async () => {
    try {
      setIsLoading(true);
      if (partnerCredentials) {
        const { partnerId, partnerSecret } = partnerCredentials;
        const requestedPartnerToken = await requestPartnerToken(partnerId, partnerSecret);
        setPartnerToken(requestedPartnerToken);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [partnerCredentials]);

  const getCompanyToken = useCallback(async () => {
    try {
      setIsLoading(true);

      if (partnerToken && companyCredentials) {
        const requestedCompanyToken = await requestCompanyToken(companyCredentials, partnerToken);
        setCompanyToken(requestedCompanyToken);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [partnerToken, companyCredentials]);

  useEffect(() => {
    if (partnerCredentials?.partnerId && partnerCredentials?.partnerSecret) {
      getPartnerToken();
    } else {
      setIsCredentialsMissing(true);
    }
  }, [partnerCredentials?.partnerId, partnerCredentials?.partnerSecret, getPartnerToken]);

  useEffect(() => {
    getCompanyToken();
  }, [getCompanyToken])

  return {
    isLoading,
    partnerToken,
    companyToken,
    isCredentialsMissing,
    setIsCredentialsMissing,
    getCompanyToken,
  };
};
