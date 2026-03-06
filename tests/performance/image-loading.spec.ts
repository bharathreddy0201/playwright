import { test } from '@playwright/test';

// specs/saucedemo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Performance Testing', () => {
  test('Image loading performance', async ({ page }) => {
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

    // expect: All product images load within 5 seconds
    const images = page.locator('.inventory_item_img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      await image.waitFor({ state: 'visible', timeout: 5000 });
    }
  });
});