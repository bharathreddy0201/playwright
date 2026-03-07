import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // globalSetup: require.resolve('./global-setup.ts'),
  // globalTeardown: require.resolve('./global-teardown.ts'),
  
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }], ['@ortoni/reporter', { outputFolder: 'ortoni-report' }]],
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
  ],
});