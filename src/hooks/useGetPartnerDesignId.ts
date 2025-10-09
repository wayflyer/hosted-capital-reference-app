import { useLocalStorage } from "@mantine/hooks";
import type { PartnerCredentials, PartnerTheme } from "../types";
import { PARTNER_TOKEN_CREDENTIALS_KEY, PARTNER_THEMES } from "../config";

export const useGetPartnerDesignId = () => {
  const [partnerCredentials] = useLocalStorage<PartnerCredentials>({ key: PARTNER_TOKEN_CREDENTIALS_KEY });
  const currentPartnerId = partnerCredentials?.partnerId;

  if (!currentPartnerId) return null;

  const existingTheme: PartnerTheme | undefined = PARTNER_THEMES.find(({ partnerId }) => partnerId === currentPartnerId);

  if (existingTheme) {
    return existingTheme.theme;
  }

  return "whiteLabel";
};
