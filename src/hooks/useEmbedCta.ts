import { useEffect, useCallback } from "react";
import {
  WayflyerUiSdk,
  type IWayflyerUiCtaSdk,
  type PartnerCallbackType,
  type SdkOptionsType,
} from "@wf-financing/ui-sdk";

export const useEmbedCta = (
  companyToken: string,
  targetId: string,
  isLoading: boolean,
) => {
  const options: SdkOptionsType = { isSandbox: true };

  const triggerCta = useCallback(async () => {
    if (!isLoading && companyToken) {
      const partnerCallback: PartnerCallbackType = () => {}; // TODO add correct link

      const sdk = (await WayflyerUiSdk.loadSdk(
        targetId,
        partnerCallback,
        companyToken,
        options,
      )) as IWayflyerUiCtaSdk;

      sdk.mountCta();
    }
  }, [companyToken, targetId, isLoading, options]);

  useEffect(() => {
    triggerCta();
  }, [triggerCta]);

  return triggerCta;
}