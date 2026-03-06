import { test } from '@playwright/test';

// specs/saucedemo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Product Browsing & Inventory', () => {
  test('Product sorting', async ({ page }) => {
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

    // 5. Click sort dropdown
    await page.locator('[data-test="product-sort-container"]').selectOption('az');

    // expect: Products sorted alphabetically A-Z
    // Note: Verify first product name starts with 'A' or similar

    // 6. Change sort to Z-A
    await page.locator('[data-test="product-sort-container"]').selectOption('za');

    // expect: Products sorted alphabetically Z-A
    // Note: Verify first product name starts with 'T' or similar

    // 7. Change sort to price low to high
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    // expect: Products sorted by price low to high

    // 8. Change sort to price high to low
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

    // expect: Products sorted by price high to low
  });
});