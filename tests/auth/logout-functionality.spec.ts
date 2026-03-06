import { test } from '@playwright/test';

// specs/saucedemo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Authentication & Login', () => {
  test('Logout functionality', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');

    // expect: Login page loads
    await page.getByTestId('username').isVisible();

    // 2. Enter 'standard_user' in username field
    await page.getByTestId('username').fill('standard_user');

    // 3. Enter 'secret_sauce' in password field
    await page.getByTestId('password').fill('secret_sauce');

    // 4. Click login button
    await page.getByTestId('login-button').click();

    // expect: User redirected to inventory page
    await page.waitForURL('**/inventory.html');

    // 5. Click hamburger menu button
    await page.getByRole('button', { name: 'Open Menu' }).click();

    // 6. Click logout link
    await page.getByRole('link', { name: 'Logout' }).click();

    // expect: User redirected back to login page
    await page.waitForURL('**/');
  });
});