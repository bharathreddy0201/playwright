import { test, expect } from '@playwright/test';

// specs/saucedemo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Performance Testing', () => {
  test('Page load times', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    const startTime = Date.now();
    await page.goto('https://www.saucedemo.com/');
    const loadTime = Date.now() - startTime;

    // expect: Login page loads within 3 seconds
    expect(loadTime).toBeLessThan(3000);

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

    // expect: Inventory page loads within 3 seconds
    const inventoryLoadTime = Date.now() - loadTime - startTime;
    expect(inventoryLoadTime).toBeLessThan(3000);
  });
});