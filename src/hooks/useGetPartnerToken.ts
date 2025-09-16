import { useEffect, useState, useMemo } from "react";

import { getPartnerCredentials } from '../utils';
import { getPartnerToken as requestPartnerToken } from "../services";

export const useGetPartnerToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [partnerToken, setPartnerToken] = useState('');
  const [isCredentialsMissing, setIsCredentialsMissing] = useState(false);

  const partnerCredentials = useMemo(() => getPartnerCredentials(), []);

  useEffect(() => {
    if (partnerCredentials) {
      try {
        setIsLoading(true);

        const getPartnerToken = async () => {
          const { partnerId, partnerSecret } = partnerCredentials;
          const partnerToken = await requestPartnerToken(partnerId, partnerSecret);

          setPartnerToken(partnerToken);
        };

        getPartnerToken();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsCredentialsMissing(true);
    }
  }, [partnerCredentials]);

  return {
    isLoading,
    partnerToken,
    isCredentialsMissing,
    setIsCredentialsMissing,
  }
};
