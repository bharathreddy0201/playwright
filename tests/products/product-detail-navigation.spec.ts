// specs/saucedemo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test } from '@playwright/test';

test.describe('Product Browsing & Inventory', () => {
  test('Product detail page navigation works', async ({ page }) => {
    // 1. Login with standard_user
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.waitForURL('**/inventory.html');

    // expect: User is logged in and on inventory page
    await page.getByText('Swag Labs').isVisible();

    // 2. Click on any product name
    await page.getByTestId('item-4-title-link').click();

    // expect: Product detail page loads with image, description, price
    await page.waitForURL('**/inventory-item.html*');
    await page.locator('.inventory_details_img').isVisible();
    await page.locator('.inventory_details_name').isVisible();
    await page.locator('.inventory_details_desc').isVisible();
    await page.locator('.inventory_details_price').isVisible();

    // 3. Click 'Back to products' button
    await page.getByTestId('back-to-products').click();

    // expect: User returned to inventory page
    await page.waitForURL('**/inventory.html');
    await page.locator('.inventory_item').first().isVisible();
  });
});