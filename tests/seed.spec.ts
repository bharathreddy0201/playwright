
// tests/seed.spec.ts
import { test } from '@playwright/test';

test('seed - navigate to login page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await page.waitForURL('**/inventory.html');
});
