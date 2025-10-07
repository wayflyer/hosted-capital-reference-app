import { useEffect, useCallback } from "react";
import {
  WayflyerUiSdk,
  type PartnerCallbackType,
  type SdkOptionsType,
} from "@wf-financing/ui-sdk";

export const useEmbedCta = (
  targetId: string,
  companyToken?: string | null,
) => {
  const options: SdkOptionsType = { isSandbox: true };

  const triggerCta = useCallback(async () => {
    if (companyToken) {
      const partnerCallback: PartnerCallbackType = () => {}; // TODO add correct link

      const sdk = await WayflyerUiSdk.loadSdk(companyToken, options);

      sdk.mountCta(targetId, partnerCallback);
    }
  }, [companyToken, targetId]);

  useEffect(() => {
    triggerCta();
  }, [triggerCta]);

  return triggerCta;
}
