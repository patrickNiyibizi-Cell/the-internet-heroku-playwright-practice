import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  
  test('Basic Authentication - Valid Credentials', async ({ browser }) => {
    // Provide HTTP Basic Auth credentials at the context level
    const context = await browser.newContext({
      httpCredentials: { username: 'admin', password: 'admin' }
    });
    const page = await context.newPage();

    await page.goto('/basic_auth');

    // Verify success message
    const successMessage = page.locator('.example p');
    await expect(successMessage).toContainText('Congratulations! You must have the proper credentials.');

    await context.close();
  });

  test('Form Authentication - Successful Login', async ({ page }) => {
    await page.goto('/login');
    
    // Verify page title
    await expect(page).toHaveTitle('The Internet');
    
    // Fill in login form
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Verify successful login
    await expect(page).toHaveURL(/.*secure/);
    const flashMessage = page.locator('#flash');
    await expect(flashMessage).toContainText('You logged into a secure area!');
    
    // Verify logout button is visible
    await expect(page.locator('a.button.secondary')).toBeVisible();
  });

  test('Form Authentication - Invalid Credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in login form with invalid credentials
    await page.fill('#username', 'invaliduser');
    await page.fill('#password', 'invalidpass');
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Verify error message
    const flashMessage = page.locator('#flash');
    await expect(flashMessage).toContainText('Your username is invalid!');
  });

  test('Form Authentication - Logout', async ({ page }) => {
    await page.goto('/login');
    
    // Login
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    
    // Wait for secure page
    await expect(page).toHaveURL(/.*secure/);
    
    // Click logout
    await page.click('a.button.secondary');
    
    // Verify redirected to login page
    await expect(page).toHaveURL(/.*login/);
    const flashMessage = page.locator('#flash');
    await expect(flashMessage).toContainText('You logged out of the secure area!');
  });
});
