import { test } from '@playwright/test';

// specs/saucedemo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Authentication & Login', () => {
  test('Login with locked_out_user', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');

    // expect: Login page loads
    await page.getByTestId('username').isVisible();

    // 2. Enter 'locked_out_user' in username field
    await page.getByTestId('username').fill('locked_out_user');

    // 3. Enter 'secret_sauce' in password field
    await page.getByTestId('password').fill('secret_sauce');

    // 4. Click login button
    await page.getByTestId('login-button').click();

    // expect: Error message 'Epic sadface: Sorry, this user has been locked out.' is displayed
    await page.getByText('Epic sadface: Sorry, this user has been locked out.').isVisible();
  });
});