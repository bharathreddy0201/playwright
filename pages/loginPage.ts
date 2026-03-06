import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Saucedemo login page (https://www.saucedemo.com/)
 *
 * Contract:
 * - inputs: Playwright `Page` instance
 * - outputs: methods that navigate, fill credentials, submit and read errors
 * - error modes: throws when required elements aren't visible within default timeouts
 */
export class LoginPage {
	readonly page: Page;
	readonly usernameInput: Locator;
	readonly passwordInput: Locator;
	readonly loginButton: Locator;
	readonly errorMessage: Locator;

	constructor(page: Page) {
		this.page = page;
		this.usernameInput = page.getByPlaceholder('Username');
		this.passwordInput = page.getByTestId('password');
		this.loginButton = page.locator('#login-button');
		this.errorMessage = page.locator('div.error-message-container h3');
	}

	/** Navigate to the login page */
	async goto(): Promise<void> {
		await this.page.goto('https://www.saucedemo.com/');
	}

	/** Fill username and password (does not submit) */
	async fillCredentials(username: string, password: string): Promise<void> {
		await this.usernameInput.fill(username);
		await this.passwordInput.fill(password);
	}

	/** Submit the login form */
	async submit(): Promise<void> {
		await this.loginButton.click();
	}

	/** Convenience: perform full login */
	async login(username: string, password: string): Promise<void> {
		await this.fillCredentials(username, password);
		await this.submit();
	}

	/** Standard test user for saucedemo */
	async loginAsStandardUser(): Promise<void> {
		await this.login('standard_user', 'secret_sauce');
	}

	/** Returns the visible error message text, or null if none */
	async getErrorMessage(): Promise<string | null> {
		if (await this.errorMessage.count() === 0) return null;
		const visible = await this.errorMessage.first().isVisible().catch(() => false);
		if (!visible) return null;
		return (await this.errorMessage.first().textContent())?.trim() ?? null;
	}
}

export default LoginPage;
