import { test } from '@playwright/test';

// specs/saucedemo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Authentication & Login', () => {
  test('Login with error_user', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');

    // expect: Login page loads
    await page.getByTestId('username').isVisible();

    // 2. Enter 'error_user' in username field
    await page.getByTestId('username').fill('error_user');

    // 3. Enter 'secret_sauce' in password field
    await page.getByTestId('password').fill('secret_sauce');

    // 4. Click login button
    await page.getByTestId('login-button').click();

    // expect: User redirected to inventory page
    await page.waitForURL('**/inventory.html');

    // expect: Error user has specific behavior issues
    // Note: This user is designed to have various error conditions
  });
});