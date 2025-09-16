import { uniqueNamesGenerator } from "unique-names-generator";

import { adjectives, companyNouns, lastNames, firstNames } from '../config';
import type { CredentialSelector } from "../types";

export const generateRandomName = (
  id: number,
  selectorType: CredentialSelector,
  companyName?: string
) => {
  const SALT = "your-fixed-app-salt-v1";
  const dictionaries = [];
  let seed = `${selectorType}:${id}:${SALT}`;
  let separator = '';

  if (selectorType === 'user_id') {
    seed = `${seed}:${companyName}`;
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
