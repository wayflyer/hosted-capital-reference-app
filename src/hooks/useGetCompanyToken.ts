import { useEffect, useState } from "react";

import { getPartnerId } from '../utils';
import { getPartnerToken, getCompanyToken as requestCompanyToken } from "../services";

export const useGetCompanyToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [companyToken, setCompanyToken] = useState('');
  const partnerId = getPartnerId() as string;

  useEffect(() => {
    const getCompanyToken = async () => {
      try {
        setIsLoading(true);
        const secret = 'Po3SP8sUt5FvZw__FO89og0RUWYB5JxMCepUkg_jNKbN8uK-hYM_JbvWhIwJs9rA';
        const partnerToken = await getPartnerToken(partnerId, secret);
        const requestedCompanyToken = await requestCompanyToken(partnerToken);

        setCompanyToken(requestedCompanyToken);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCompanyToken();
  }, [partnerId]);

  return {
    isLoading,
    companyToken,
  };
};