import { useEffect, useState, useMemo } from "react";

import { getPartnerCredentials } from '../utils';
import { getPartnerToken, getCompanyToken as requestCompanyToken } from "../services";

export const useGetCompanyToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [companyToken, setCompanyToken] = useState('');
  const [isCredentialsMissing, setIsCredentialsMissing] = useState(false);

  const partnerCredentials = useMemo(() => {

    return getPartnerCredentials();
  }, [isCredentialsMissing]);

  useEffect(() => {
    if (partnerCredentials) {
      const getCompanyToken = async () => {
        try {
          setIsLoading(true);
          const { partnerId, partnerSecret } = partnerCredentials;
          const partnerToken = await getPartnerToken(partnerId, partnerSecret);
          const requestedCompanyToken = await requestCompanyToken(partnerToken);

          setCompanyToken(requestedCompanyToken);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      getCompanyToken();
    } else {
      setIsCredentialsMissing(true);
    }
  }, [partnerCredentials]);

  return {
    isLoading,
    companyToken,
    isCredentialsMissing,
    setIsCredentialsMissing,
  };
};