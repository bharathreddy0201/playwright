import { test } from '@playwright/test';

// specs/saucedemo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Authentication & Login', () => {
  test('Login with empty fields', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');

    // expect: Login page loads
    await page.getByTestId('username').isVisible();

    // 2. Leave username field empty

    // 3. Leave password field empty

    // 4. Click login button
    await page.getByTestId('login-button').click();

    // expect: Error message 'Epic sadface: Username is required' is displayed
    await page.getByText('Epic sadface: Username is required').isVisible();
  });
});