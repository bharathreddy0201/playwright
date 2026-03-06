import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';

test('login with standard user navigates to inventory', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  
  // Visual assertion: capture baseline screenshot of login page
  await expect(page).toHaveScreenshot('login-page.png');
  
  await login.loginAsStandardUser();
  await expect(page).toHaveURL(/inventory.html/);
  
  // Visual assertion: capture screenshot of inventory page after login
  await expect(page).toHaveScreenshot('inventory-page.png');
});
