import { test } from '@playwright/test';

// specs/saucedemo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Authentication & Login', () => {
  test('Login with invalid credentials', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');

    // expect: Login page loads
    await page.getByTestId('username').isVisible();

    // 2. Enter 'invalid_user' in username field
    await page.getByTestId('username').fill('invalid_user');

    // 3. Enter 'wrong_password' in password field
    await page.getByTestId('password').fill('wrong_password');

    // 4. Click login button
    await page.getByTestId('login-button').click();

    // expect: Error message 'Epic sadface: Username and password do not match any user in this service' is displayed
    await page.getByText('Epic sadface: Username and password do not match any user in this service').isVisible();
  });
});