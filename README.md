# evra-tests

This is a test framework for EVRA application. It is implemented using Playwright and TypeScript.

## Setup

1. `npm install` - install the dependencies
2. `npx playwright install` - install the browsers needed to run Playwright. [More Info](https://playwright.dev/docs/browsers#install-browsers)

## Running tests

- `npm test` - runs all the tests in headless mode
- `npm run debug` - runs the tests in headed mode
- `npm run test -- relative/path/to/playwright/test-suite1.spec.ts relative/path/to/playwright/test-suite2.spec.ts` - runs the specified tests only. Change the mode to debug if you want to run in headed mode.

### Running via Visual Studio Code

If you're using VSCode, the easiest way to run the tests is by installing the official Playwright extension, and pressing the ▶️ button next to the title of the test.

To see the detailed report, run the following command:

- `npx playwright show-report`

This will serve the complete report, including traces, with your default browser.

### Debugging tests

Debugging via Visual Studio Code is the recommended way to debug your tests.

1. Add a breakpoint in the line number gutter as you usually would
2. Right click the ▶️ button
3. Choose `Debug Test`
4. Once the tests start, you should see a control bar in the editor.
5. You can now step through, in, and out of your tests and functions.

## Test execution in multiple environments

The project supports test execution on multiple environments with the following commands:

- `npm run test:qa` - the actual environment from the assignment description
- `npm run test:dev` - just an example of another environment

The environment details are managed in `.env` files located in the project root. They contain baseURL and user credentials. [More Info](https://www.npmjs.com/package/dotenv)

Adding more test environments can be done easily by created another `.env` file and adding command to `package.json`.

## Test execution in multiple browsers / devices / screen resolutions

By default all the tests are executed in desktop Chrome.
You can change the setup in `playwright.config.js`. Just uncomment the desired browser or viewport (including mobiles) in `projects` array.

## Test credential management for different environments or use cases

The test credentials are managed in `.env` files.
Test case specific credentials can be provided as params of `login()` method in tests themselves.

## Snapshot Testing

The tests contains snapshot validation. [More Info](https://playwright.dev/docs/test-snapshots)

These assertions are ignored in the pipeline for now since it would require more work (to save images as artifacts and share them between the jobs).

## Code formater

The following commands can be used to format the code in the repo:

- `npm run prettier` - to check if there are any issues in the files
- `npm run fix` - fixes the format issues
