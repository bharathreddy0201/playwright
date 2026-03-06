// global-setup.ts
import { chromium, firefox } from 'playwright';

async function globalSetup() {
  console.log('🚀 Global setup: Authenticating for Chrome and Firefox...');
  
  const credentials = {
    username: 'standard_user',
    password: 'secret_sauce'
  };
  
  // Chrome setup
  console.log('→ Setting up Chrome authentication...');
  const chromeBrowser = await chromium.launch();
  const chromeContext = await chromeBrowser.newContext();
  const chromePage = await chromeContext.newPage();
  
  await chromePage.goto('https://www.saucedemo.com/');
  await chromePage.getByPlaceholder('Username').fill(credentials.username);
  await chromePage.getByTestId('password').fill(credentials.password);
  await chromePage.locator('#login-button').click();
  await chromePage.waitForURL('**/inventory.html');
  
  await chromeContext.storageState({ path: 'auth-chrome.json' });
  await chromeBrowser.close();
  console.log('✅ Chrome authentication saved');
  
  // Firefox setup
  console.log('→ Setting up Firefox authentication...');
  const firefoxBrowser = await firefox.launch();
  const firefoxContext = await firefoxBrowser.newContext();
  const firefoxPage = await firefoxContext.newPage();
  
  await firefoxPage.goto('https://www.saucedemo.com/');
  await firefoxPage.getByPlaceholder('Username').fill(credentials.username);
  await firefoxPage.getByTestId('password').fill(credentials.password);
  await firefoxPage.locator('#login-button').click();
  await firefoxPage.waitForURL('**/inventory.html');
  
  await firefoxContext.storageState({ path: 'auth-firefox.json' });
  await firefoxBrowser.close();
  console.log('✅ Firefox authentication saved');
  
  console.log('✅ Global setup completed');
}

export default globalSetup;