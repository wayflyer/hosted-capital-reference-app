import type { Dispatch, SetStateAction } from 'react'
import { useQuery } from '@tanstack/react-query';

import { getPartnerToken } from "../services";
import { getPartnerCredentials } from "../utils";

export const useRequestPartnerToken = (setIsPartnerCredentialsMissing: Dispatch<SetStateAction<boolean>>) => {
  const partnerCredentials = getPartnerCredentials();
  const partnerSecret = partnerCredentials?.partnerSecret;
  const partnerId = partnerCredentials?.partnerId;

  return useQuery({
    queryKey: ['partnerToken'],
    queryFn: () => {
      if (partnerId && partnerSecret) {
        setIsPartnerCredentialsMissing(false);

        return getPartnerToken(partnerId, partnerSecret);
      }

      setIsPartnerCredentialsMissing(true);
      return null;
    },
  });
};