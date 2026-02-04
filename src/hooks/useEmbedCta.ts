import { useEffect } from "react";
import { WayflyerHeadlessSdk, type HeadlessSdkOptions } from "@wf-financing/headless-sdk";

export const useEmbedCta = (
  companyToken?: string | null,
) => {
  const options: HeadlessSdkOptions = { isSandbox: true };

  useEffect(() => {
    const getSdk = async () => {
      if (companyToken) {
        const sdk = await WayflyerHeadlessSdk.loadSdk(companyToken, options);

        const cta = await sdk.getCta();
        console.log(cta);
      }
    }

    getSdk();
  }, [companyToken]);
}