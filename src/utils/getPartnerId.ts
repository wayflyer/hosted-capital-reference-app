const PARTNER_ID_KEY = 'partner_id';

type ExtractPartnerIdCallbackType = () => string | null;
type ExtractPartnerIdType = (getPartnerIdCallback: ExtractPartnerIdCallbackType) => string | false;

export const extractPartnerIdFromLocalStorage: ExtractPartnerIdCallbackType = ()=> localStorage.getItem(PARTNER_ID_KEY);
export const extractPartnerIdFromSearchParams: ExtractPartnerIdCallbackType = ()=> {
  const searchParams = new URLSearchParams(window.location.search);

  return searchParams.get(PARTNER_ID_KEY);
};

export const extractPartnerId: ExtractPartnerIdType = (extractPartnerIdCallback) => {
  const partnerId = extractPartnerIdCallback();

  if (partnerId === null) return false

  return partnerId;
};

export const getPartnerId = (): string | null => {
  const extractors = [extractPartnerIdFromLocalStorage, extractPartnerIdFromSearchParams];

  return extractors.map((extractor) => extractPartnerId(extractor))
    .find(Boolean) || null;
}
