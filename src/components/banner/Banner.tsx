import {
  SdkScenarios,
  WayflyerUiSdk,
  type IWayflyerUiCtaSdk,
  type MockedModeType,
  type PartnerCallbackType,
} from "@wf-financing/ui-sdk";
import { useEffect } from "react";
import { getCompanyToken, getIsMockedMode } from "../../lib/utils";
import type { Theme } from "../select-theme/theme";

type BannerProps = {
  targetId?: string;
  partnerDesignId: Theme;
  scenario: SdkScenarios;
};

export const Banner = ({
  targetId = "ui-banner-container",
  partnerDesignId,
  scenario,
}: BannerProps) => {
  const companyToken = getCompanyToken();
  const isMockedMode = getIsMockedMode();

  useEffect(() => {
    const loadAndMountCta = async () => {
      const partnerCallback: PartnerCallbackType = () => {};
      const mockedMode: MockedModeType = {
        isMockedMode,
        sdkScenario: scenario,
      };

      const sdk = (await WayflyerUiSdk.loadSdk(
        targetId,
        partnerDesignId,
        partnerCallback,
        companyToken,
        mockedMode,
      )) as IWayflyerUiCtaSdk;

      sdk.mountCta();
    };

    loadAndMountCta();
  }, [scenario, isMockedMode, partnerDesignId, companyToken, targetId]);

  return (
    <>
      <div id={targetId} />
    </>
  );
};
