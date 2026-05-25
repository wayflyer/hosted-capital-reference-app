# Wayflyer Embedded Finance UI SDK Reference App

This is a React Vite app that demonstrates the features of the [@wf-financing/ui-sdk](https://www.npmjs.com/package/@wf-financing/ui-sdk) package, including the CTA banner and the Embedded Journey panel.

You can see a live example at [https://demo.wayflyerhostedcapital.com/](https://demo.wayflyerhostedcapital.com/)

Use the `Select Scenario` button to choose a scenario and see how the UI reacts.
Use the `Select Theme` button to choose a theme and see how the UI reacts.

## Quickstart

### Using devcontainers

We love [devcontainers](https://code.visualstudio.com/docs/devcontainers/containers) at Wayflyer. This project contains a `.devcontainer/devcontainer.json` file so you can quickly get started using VS Code or one of many editors that support devcontainers. Open the command palette and choose `Dev Containers: Clone Repository in Container Volume...` and paste the URL of this repo.

### Without devcontainers

If you don't want to use a devcontainer you can just clone the repo in the normal way.

### Installing dependencies

From your terminal:

1. Install dependencies with `pnpm i`
1. Run the app with `pnpm dev`

You should now be able to access the app at http://localhost:5173

### Preview mode

This is a Vite application, and the dev mode can be quite slow. You can build and preview the app by running `pnpm build && pnpm preview`. Just make sure to run `pnpm build` again after making any changes.

## UI SDK Usage Examples

### UI SDK Initialization

The Wayflyer UI SDK is initialized in `src/hooks/useEmbedCta.ts`. The SDK is loaded and the CTA is mounted with a prefill callback:

```ts
import {
  WayflyerUiSdk,
  type EmbeddedJourneyPrefillCallback,
  type SdkOptionsType,
} from "@wf-financing/ui-sdk";

const options: SdkOptionsType = { isSandbox: true };
const sdk = await WayflyerUiSdk.loadSdk(companyToken, options);

const prefillCallback: EmbeddedJourneyPrefillCallback = async () => ({
  email: "merchant@example.com",
  companyName: "Acme Ltd",
  country: "IE",
});

sdk.mountCta(targetId, prefillCallback);
```

- `companyToken`: In production this would be minted from the API by exchanging your partner token. Consult the documentation at [https://docs.wayflyer.com](https://docs.wayflyer.com) for more instructions.
- `prefillCallback`: Called when the Embedded Journey panel opens. Returns data to pre-populate the application form. See the [Prefilling Application Data](https://docs.wayflyer.com/embedded-finance/embedded-journey/prefilling-application-data) guide for details.

### Target container

The CTA banner is mounted into the DOM element with the targetId provided to the component:

```ts
<div id="ui-banner-container"></div>
```

### Mocking API calls

The reference app runs in sandbox mode by default, which simulates API responses for testing and development.

#### Available scenarios

When running in sandbox mode, you can preview different banner states by changing the scenario:

- **Indicative Offer**: Simulates a customer who hasn't started an application but has an indicative offer based on partner data. Displays a personalised offer and CTA to apply.
- **Generic New Application**: Simulates a customer who hasn't started an application and lacks sufficient data for an indicative offer. Shows a generic invitation to apply for financing.
- **Continue Application**: Simulates a customer with an incomplete embedded application. Shows progress-related messaging and CTAs encouraging them to continue.
- **No CTA**: Simulates a customer who sees no banner, either due to ineligibility or no relevant CTAs at this time.
- Simulate auth errors

## Using it with real credentials

The repo comes with a `.env` file in the root that starts the UI SDK in sandbox mode with a fake company token. You can override the values in this file by creating a `.env.local` file. Any keys in `.env.local` will be used instead of the values from `.env`. The `.gitignore` is configured to ignore `.env.local`

To use it for real:

1. Use the `get-company-token` command to create a Company Token using your Client ID and Client Secret
1. Create a `.env.local` if you haven't already
1. Override `VITE_WF_COMPANY_TOKEN` in `.env.local` with the Company Token you just generated.
1. Override `VITE_WF_MOCKED_MODE` to `"false"` (or any value except `"true"`) in `.env.local`
