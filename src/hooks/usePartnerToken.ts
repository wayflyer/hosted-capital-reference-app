import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useLocalStorage } from "@mantine/hooks";

import { getPartnerToken } from "../services";
import { queryKeys } from "../config";
import { extractPartnerCredentialsFromSearchParams } from "../utils";
import { PARTNER_TOKEN_CREDENTIALS_KEY } from "../config";
import type { PartnerCredentials } from "../types";

type PartnerToken = {
  token: string;
  expires_in: number;
};

const BUFFER_SECONDS = 60;

export const usePartnerToken = () => {
  const [partnerCredentials, setPartnerCredentials] = useLocalStorage<PartnerCredentials>({
    key: PARTNER_TOKEN_CREDENTIALS_KEY,
  });
  const partnerCredentialsFromSearchParams = extractPartnerCredentialsFromSearchParams();

  const takeCredentialsFromSearchParams = () => {
    if (!partnerCredentialsFromSearchParams) return false;

    if (!partnerCredentials) return true;

    const newPartnerId = partnerCredentialsFromSearchParams?.partnerId;
    const currentPartnerId = partnerCredentials?.partnerId;
    const newPartnerSecret = partnerCredentialsFromSearchParams?.partnerSecret;
    const currentPartnerSecret = partnerCredentials?.partnerSecret;

    const isNewPartnerIdEqualsToCurrent = newPartnerId !== currentPartnerId;
    const isNewPartnerSecretEqualsToCurrent = newPartnerSecret !== currentPartnerSecret;

    return isNewPartnerIdEqualsToCurrent || isNewPartnerSecretEqualsToCurrent;
  };

  if (takeCredentialsFromSearchParams()) {
    setPartnerCredentials(partnerCredentialsFromSearchParams);
  }

  const partnerId = partnerCredentials?.partnerId;
  const partnerSecret = partnerCredentials?.partnerSecret;

  return useQuery({
    queryKey: queryKeys.partnerToken(partnerId, partnerSecret),
    queryFn: async () => {
      if (partnerId && partnerSecret) {
        return await getPartnerToken(partnerId, partnerSecret);
      }

      return null;
    },
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: (query) => {
      const data = query.state.data as PartnerToken | undefined;
      if (!data) return true;
      const updatedAt = query.state.dataUpdatedAt;
      const ageSec = (Date.now() - updatedAt) / 1000;
      return ageSec >= data.expires_in - BUFFER_SECONDS;
    },
    refetchInterval: (query) => {
      const data = query.state.data as PartnerToken | undefined;
      if (!data) return false;
      const updatedAt = query.state.dataUpdatedAt;
      const ageSec = (Date.now() - updatedAt) / 1000;
      const remainingSec = Math.max(
        0,
        data.expires_in - ageSec - BUFFER_SECONDS,
      );
      return remainingSec > 0 ? remainingSec * 1000 : 1000;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    gcTime: 23 * 60 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
