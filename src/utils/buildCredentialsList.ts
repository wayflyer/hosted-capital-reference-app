import { generateRandomName } from "./generateRandomName";
import type { CredentialSelectorType } from "../types";

type Credential = {
  externalId: string;
  displayName?: string;
};

type BuildCredentialsList = (
  previousCredentials: Credential[] | null,
  idList: string[],
  selectorType: CredentialSelectorType,
  companyId?: string,
) => Credential[];

export const buildCredentialsList: BuildCredentialsList = (
  previousCredentials,
  idList,
  selectorType,
  companyId,
) => {
  if (!previousCredentials) {
    return idList.map((externalId) => ({
      externalId,
      displayName: generateRandomName(externalId, selectorType, companyId),
    }));
  }

  const previousCredentialsIdList = previousCredentials.map(({ externalId }) => externalId);
  const fullList = [...previousCredentialsIdList, ...idList];
  const uniqueIdList = Array.from(new Set(fullList));

  return uniqueIdList.map((externalId) => ({
    externalId,
    displayName: generateRandomName(externalId, selectorType, companyId),
  }));
};