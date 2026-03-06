import { test } from '@playwright/test';

// specs/saucedemo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Authentication & Login', () => {
  test('Login with performance_glitch_user', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');

    // expect: Login page loads
    await page.getByTestId('username').isVisible();

    // 2. Enter 'performance_glitch_user' in username field
    await page.getByTestId('username').fill('performance_glitch_user');

    // expect: Login completes within reasonable time
    // Note: This user is designed to be slow, so we allow more time

    // 3. Enter 'secret_sauce' in password field
    await page.getByTestId('password').fill('secret_sauce');

    // expect: Login completes within reasonable time
    // Note: This user is designed to be slow, so we allow more time

    // 4. Click login button
    await page.getByTestId('login-button').click({ timeout: 10000 }); // Allow more time for slow user

    // expect: User redirected to inventory page
    await page.waitForURL('**/inventory.html');
  });
});