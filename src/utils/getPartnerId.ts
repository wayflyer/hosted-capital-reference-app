import { PARTNER_ID_KEY, PARTNER_SECRET_KEY, PARTNER_TOKEN_CREDENTIALS_KEY } from '../config';

type PartnerCredentialsType = {
  partnerId: string;
  partnerSecret: string;
};

type ExtractPartnerCredentialsCallbackType = () => PartnerCredentialsType | null;
type ExtractPartnerCredentialsType = (getPartnerIdCallback: ExtractPartnerCredentialsCallbackType) => PartnerCredentialsType | false;

export const extractPartnerCredentialsFromLocalStorage: ExtractPartnerCredentialsCallbackType = ()=> {
  const partnerCredentials = localStorage.getItem(PARTNER_TOKEN_CREDENTIALS_KEY);

  if (partnerCredentials) {
    return JSON.parse(partnerCredentials);
  }

  return partnerCredentials;
};
export const extractPartnerCredentialsFromSearchParams: ExtractPartnerCredentialsCallbackType = ()=> {
  const searchParams = new URLSearchParams(window.location.search);
  const partnerCredentials = {
    partnerId: searchParams.get(PARTNER_ID_KEY),
    partnerSecret: searchParams.get(PARTNER_SECRET_KEY),
  };

  if (Object.values(partnerCredentials).every(partnerCredential => partnerCredential !== null)) {
    localStorage.setItem(PARTNER_TOKEN_CREDENTIALS_KEY, JSON.stringify(partnerCredentials));

    return partnerCredentials as PartnerCredentialsType;
  }

  return null;
};

export const extractPartnerCredentials: ExtractPartnerCredentialsType = (extractPartnerIdCallback) => {
  const partnerId = extractPartnerIdCallback();

  if (partnerId === null) return false

  return partnerId;
};

export const getPartnerCredentials = (): PartnerCredentialsType | null => {
  const extractors = [extractPartnerCredentialsFromLocalStorage, extractPartnerCredentialsFromSearchParams];

  return extractors.map((extractor) => extractPartnerCredentials(extractor))
    .find(Boolean) || null;
}
