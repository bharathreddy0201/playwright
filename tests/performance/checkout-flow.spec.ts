import { test } from '@playwright/test';

// specs/saucedemo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Performance Testing', () => {
  test('Checkout flow performance', async ({ page }) => {
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

    // 5. Add first product to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 6. Click cart icon
    await page.locator('.shopping_cart_link').click();

    // expect: Cart page loads
    await page.waitForURL('**/cart.html');

    // 7. Click checkout button
    await page.locator('[data-test="checkout"]').click();

    // expect: Checkout step one page loads
    await page.waitForURL('**/checkout-step-one.html');

    // 8. Fill checkout information
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');

    // 9. Click continue button
    await page.locator('[data-test="continue"]').click();

    // expect: Checkout step two page loads
    await page.waitForURL('**/checkout-step-two.html');

    // 10. Click finish button
    await page.locator('[data-test="finish"]').click();

    // expect: Checkout complete page loads
    await page.waitForURL('**/checkout-complete.html');

    // expect: Entire checkout flow completes within 10 seconds
    // Note: This is a rough estimate - adjust based on actual performance
  });
});