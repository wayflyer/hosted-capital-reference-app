import { useEffect, useCallback } from "react";
import {
  WayflyerHeadlessSdk,
  type SdkOptionsType,
} from "@wf-financing/headless-sdk";

export const useEmbedCta = (
  targetId: string,
  companyToken?: string | null,
) => {
  const options: SdkOptionsType = { isSandbox: true };

  const triggerCta = useCallback(async () => {
    if (companyToken) {
      const sdk = await WayflyerHeadlessSdk.loadSdk(companyToken, options);
      const cta = await sdk.getCta();

      console.log(cta);
    }
  }, [companyToken, targetId]);

  useEffect(() => {
    triggerCta();
  }, [triggerCta]);

  return triggerCta;
}