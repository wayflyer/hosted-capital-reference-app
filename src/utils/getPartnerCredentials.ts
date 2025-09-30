import {
  PARTNER_ID_KEY,
  PARTNER_SECRET_KEY,
  PARTNER_TOKEN_CREDENTIALS_KEY,
} from '../config';

type PartnerCredentials = {
  partnerId: string;
  partnerSecret: string;
};

type ExtractPartnerCredentialsCallback = () => PartnerCredentials | null;
type ExtractPartnerCredentials = (getPartnerIdCallback: ExtractPartnerCredentialsCallback) => PartnerCredentials | false;

export const extractPartnerCredentialsFromLocalStorage: ExtractPartnerCredentialsCallback = ()=> {
  const partnerCredentials = localStorage.getItem(PARTNER_TOKEN_CREDENTIALS_KEY);

  if (partnerCredentials) {
    try {
      return JSON.parse(partnerCredentials);
    } catch (error) {
      console.error(error);
    }
  }

  return null;
};

export const extractPartnerCredentialsFromSearchParams: ExtractPartnerCredentialsCallback = ()=> {
  const searchParams = new URLSearchParams(window.location.search);
  const partnerCredentials = {
    partnerId: searchParams.get(PARTNER_ID_KEY),
    partnerSecret: searchParams.get(PARTNER_SECRET_KEY),
  };

  if (Object.values(partnerCredentials).every(partnerCredential => partnerCredential !== null)) {
    localStorage.setItem(PARTNER_TOKEN_CREDENTIALS_KEY, JSON.stringify(partnerCredentials));

    return partnerCredentials as PartnerCredentials;
  }

  return null;
};

export const extractPartnerCredentials: ExtractPartnerCredentials = (extractPartnerIdCallback) => {
  const partnerId = extractPartnerIdCallback();

  if (partnerId === null) return false;

  return partnerId;
};

export const getPartnerCredentials = (): PartnerCredentials | null => {
  const extractors = [extractPartnerCredentialsFromSearchParams, extractPartnerCredentialsFromLocalStorage];

  return extractors.map((extractor) => extractPartnerCredentials(extractor))
    .find(Boolean) || null;
}
