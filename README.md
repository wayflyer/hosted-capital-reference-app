# Wayflyer Embedded Finance UI SDK reference app

This is a React Vite app that demonstrates some of the features of [@wayflyer/sdk](https://www.npmjs.com/package/@wayflyer/sdk)

You can see a live example at [https://sdk-cta-ui-reference-app.vercel.app/](https://sdk-cta-ui-reference-app.vercel.app/)

Use the `Select Scenario` button to choose a scenario and see how the UI reacts.
Use the `Select Theme` button to choose a theme and see how the UI reacts. The `partnerDesignId` prop applies a visual theme to the banner.

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

The Wayflyer CTA UI SDK is initialized in `src/components/banner/Banner.tsx`. From there, you can see how to:

- Create a new UI SDK instance with your company token
- In production this would be minted from the API by exchanging your partner token; consult the documentation at [https://docs.wayflyer.com](https://docs.wayflyer.com) for more instructions.
- Builds a mockedMode object:
  `const mockedMode: MockedModeType = { isMockedMode, sdkScenario: scenario};`
  - isMockedMode: When true, the SDK uses mock responses instead of calling the real API.
  - sdkScenario: One of the predefined SdkScenarios that determines the type of banner to display.
- Calls:
  ```ts
  const sdk = await WayflyerUiSdk.loadSdkMode(
    targetId,
    partnerDesignId,
    partnerCallback,
    companyToken,
    mockedMode
  );

  sdk.mountCta();
  ```

### Target container

The banner is mounted into the DOM element with the targetId provided to the component. By default, this is `ui-banner-container`:
```ts
  <div id="ui-banner-container"></div>
```


### Mocking API calls

The UI SDK is currently still under active development and is configured to always intercept requests to the Wayflyer API and return mocked responses.

#### Available scenarios

When running in mocked mode, you can preview different banner states by changing the scenario prop.
These scenarios are defined in the SdkScenarios enum and typically include:

- **Indicative Offer**: Simulates a customer who hasn`t started an application but has an indicative offer based on partner data. Displays a personalized offer and CTA to apply.
- **Generic New Application**: Simulates a customer who hasn't started an application and lacks sufficient data for an indicative offer. Shows a generic invitation to apply for financing.
- **Continue Application**: Simulates a customer with an incomplete application. Shows progress-related messaging and CTAs encouraging them to finish applying.
- **No CTA**: Simulates a customer who sees no banner, either due to ineligibility or no relevant CTAs at this time.
- Simulate auth errors

## Using it with real credentials

The repo comes with a `.env` file in the root that starts the UI SDK in mocked mode with a fake company token. You can override the values in this file by creating a `.env.local` file. Any keys in `.env.local` will be used instead of the values from `.env`. The `.gitignore` is configured to ignore `.env.local`

To use it for real

1. Use the `get-company-token` command to create a Company Token using your Client ID and Client Secret
1. Create a `.env.local` if you haven't already
1. Override `VITE_WF_COMPANY_TOKEN` in `.env.local` with the Company Token you just generated.
1. Override `VITE_WF_MOCKED_MODE` to `"false"` (or any value except `"true"`) in `.env.local`
