import { useEffect } from "react";
import {
  WayflyerUiSdk,
  type IWayflyerUiCtaSdk,
  type PartnerCallbackType,
} from "@wf-financing/ui-sdk";

export const useEmbedCta = (
  companyToken: string,
  targetId: string,
  partnerDesignId: string,
  isLoading: boolean,
) => {
  useEffect(() => {
    const loadAndMountCta = async () => {
      if (!isLoading && companyToken) {
        const partnerCallback: PartnerCallbackType = () => {}; // TODO add correct link

        const sdk = (await WayflyerUiSdk.loadSdk(
          targetId,
          partnerDesignId,
          partnerCallback,
          companyToken
        )) as IWayflyerUiCtaSdk;

        sdk.mountCta();
      }
    };

    loadAndMountCta();
  }, [partnerDesignId, companyToken, targetId, isLoading]);
}