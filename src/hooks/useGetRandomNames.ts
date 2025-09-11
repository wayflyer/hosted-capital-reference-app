import { useMemo } from "react";

import type { CredentialSelectorType } from "../types";
import { generateRandomName } from "../utils";

export const useGetRandomNames = (namesCount: number, selectorType: CredentialSelectorType) => {
  return useMemo(() => {
    return Array.from({ length: namesCount }, (_, index) =>
      generateRandomName(index, selectorType),
    );
  }, [namesCount]);
};
