import { apiClient } from "../api";
import { PARTNER_TOKEN_URL } from "../config";

type GetPartnerTokenType = (
  partnerId: string,
  partnerSecret: string,
) => Promise<string>;

export const getPartnerToken: GetPartnerTokenType = async (
  partnerId,
  partnerSecret,
) => {
  const partnerTokenResponse = await apiClient.post(PARTNER_TOKEN_URL, {
    partner_id: partnerId,
    partner_secret: partnerSecret,
  });

  return partnerTokenResponse.data.token;
};
