import { defineConfig, devices } from '@playwright/test';

// helper that builds a WebSocket endpoint for BrowserStack
// based on the standard capability object and environment variables.
function buildBrowserStackEndpoint() {
  const caps = {
    browser: 'chrome',
    browserVersion: 'latest',
    os: 'osx',
    osVersion: 'Ventura',
    name: 'playwright suite',
    // credentials are provided by env vars
    'browserstack.username': process.env.BROWSERSTACK_USERNAME,
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
  };
  return `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
    JSON.stringify(caps)
  )}`;
}

export default defineConfig({
  testDir: './tests',
  // globalSetup: require.resolve('./global-setup.ts'),
  // globalTeardown: require.resolve('./global-teardown.ts'),
  
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }]], // removed custom reporter which was not installed

  use: {
    trace: 'on-first-retry',
    testIdAttribute: 'data-test',
    headless: true,
    // Add screenshot configuration for visual testing
    screenshot: 'on', // Capture screenshots for all tests
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // storageState: 'auth-chrome.json',  // Use Chrome auth
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        // storageState: 'auth-firefox.json',  // Use Firefox auth
      },
    },
    {
      // runs on BrowserStack rather than locally
      name: 'bs-chrome',
      use: {
        browserName: 'chromium',
        connectOptions: {
          wsEndpoint: buildBrowserStackEndpoint(),
        },
      },
    },
  ],
});

// export BROWSERSTACK_USERNAME=bharathnagaluruv_4CXd7r
// export BROWSERSTACK_ACCESS_KEY=uhLJX68NxSH9TApFtjiP