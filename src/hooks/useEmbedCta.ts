import { useEffect, useCallback } from "react";
import {
  WayflyerUiSdk,
  type EmbeddedJourneyPrefillCallback,
  type SdkOptionsType,
} from "@wf-financing/ui-sdk";

export const useEmbedCta = (targetId: string, companyToken?: string | null) => {
  const options: SdkOptionsType = { isSandbox: true };

  const triggerCta = useCallback(async () => {
    if (companyToken) {
      const prefillCallback: EmbeddedJourneyPrefillCallback = () => {
        const raw = localStorage.getItem("prefill-config");
        if (!raw) return;
        try {
          return JSON.parse(raw);
        } catch (error) {
          console.warn(
            "Failed to parse prefill-config from localStorage:",
            error,
          );
        }
      };

      const sdk = await WayflyerUiSdk.loadSdk(companyToken, options);

      sdk.mountCta(targetId, prefillCallback);
    }
  }, [companyToken, targetId]);

  useEffect(() => {
    triggerCta();
  }, [triggerCta]);

  return triggerCta;
};
