import { useEffect, useState, useMemo } from "react";

import { getPartnerCredentials } from "../utils";
import { getPartnerToken, getCompanyToken as requestCompanyToken } from "../services";
import type { CompanyCredentials } from "../types";

export const useGetAuthTokens = (companyCredentials: CompanyCredentials) => {
  const [isLoading, setIsLoading] = useState(false);
  const [companyToken, setCompanyToken] = useState('');
  const [partnerToken, setPartnerToken] = useState('');
  const [isCredentialsMissing, setIsCredentialsMissing] = useState(false);

  const partnerCredentials = useMemo(() => getPartnerCredentials(), [isCredentialsMissing]);

  useEffect(() => {
    if (partnerCredentials) {
      const getAuthTokens = async () => {
        try {
          setIsLoading(true);
          if (partnerCredentials && !partnerToken) {
            const { partnerId, partnerSecret } = partnerCredentials;
            const partnerToken = await getPartnerToken(partnerId, partnerSecret);

            setPartnerToken(partnerToken);
          }

          if (partnerToken && companyCredentials?.company_id && companyCredentials?.user_id) {
            const requestedCompanyToken = await requestCompanyToken(companyCredentials, partnerToken);
            setCompanyToken(requestedCompanyToken);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      getAuthTokens();
    } else {
      setIsCredentialsMissing(true);
    }
  }, [partnerToken, partnerCredentials, companyCredentials]);

  return {
    isLoading,
    partnerToken,
    companyToken,
    isCredentialsMissing,
    setIsCredentialsMissing,
  };
};
