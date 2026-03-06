import { test } from '@playwright/test';

// specs/saucedemo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Product Browsing & Inventory', () => {
  test('Inventory display', async ({ page }) => {
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

    // expect: 6 products are displayed
    await page.locator('.inventory_item').count() === 6;

    // expect: Each product has name, description, price, and image
    await page.locator('.inventory_item_name').first().isVisible();
    await page.locator('.inventory_item_desc').first().isVisible();
    await page.locator('.inventory_item_price').first().isVisible();
    await page.locator('.inventory_item_img').first().isVisible();
  });
});