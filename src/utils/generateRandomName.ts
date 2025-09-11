import { uniqueNamesGenerator } from "unique-names-generator";

import { adjectives, companyNouns, lastNames, firstNames } from '../config';
import type { CredentialSelectorType } from "../types";

export const generateRandomName = (id: number, selectorType: CredentialSelectorType) => {
  const SALT = "your-fixed-app-salt-v1";
  const seed = `${selectorType}:${id}:${SALT}`;
  const dictionaries = [];
  let separator = '';

  if (selectorType === 'user_id') {
    separator = ' ';
    dictionaries.push(firstNames, lastNames);
  }

  if (selectorType === 'company_id') {
    separator = '';
    dictionaries.push(adjectives, companyNouns);
  }

  const uniqueName = uniqueNamesGenerator({
    dictionaries,
    separator: separator,
    seed: seed,
    style: "capital",
  });

  return `${uniqueName}`;
};