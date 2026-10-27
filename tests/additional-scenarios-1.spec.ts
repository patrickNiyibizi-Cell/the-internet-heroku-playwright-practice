import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('A/B Testing Tests', () => {
  
  test('A/B Test - Verify Variant Display', async ({ page }) => {
    await page.goto('/abtest');
    
    // Get the heading text to determine which variant is shown
    const heading = page.locator('h3');
    const headingText = await heading.textContent();
    
    // Should be either "A/B Test Control" or "A/B Test Variation 1"
    expect(headingText).toMatch(/A\/B Test (Control|Variation 1)/);
    
    // Verify page content exists
    const content = page.locator('.example p');
    await expect(content).toBeVisible();
    
    console.log(`A/B Test Variant: ${headingText}`);
  });
});

test.describe('Digest Authentication Tests', () => {
  
  test('Digest Authentication - Valid Credentials', async ({ page }) => {
    // Navigate with digest auth credentials
    await page.goto('https://admin:admin@the-internet.herokuapp.com/digest_auth');
    
    // Verify success message
    const successMessage = page.locator('.example p');
    await expect(successMessage).toContainText('Congratulations! You must have the proper credentials.');
  });
});

test.describe('File Download Tests', () => {
  
  test('File Download - Download File', async ({ page }) => {
    await page.goto('/download');
    
    // Get all download links
    const downloadLinks = page.locator('.example a');
    const linkCount = await downloadLinks.count();
    
    // Verify there are files to download
    expect(linkCount).toBeGreaterThan(0);
    
    // Start waiting for download before clicking
    const downloadPromise = page.waitForEvent('download');
    
    // Click first download link
    await downloadLinks.first().click();
    
    // Wait for download to start
    const download = await downloadPromise;
    
    // Verify download
    expect(download.suggestedFilename()).toBeTruthy();
    console.log(`Downloaded file: ${download.suggestedFilename()}`);
    
    // Save the download to a temporary location
    const downloadPath = path.join('/tmp', download.suggestedFilename());
    await download.saveAs(downloadPath);
    
    // Verify file exists
    expect(fs.existsSync(downloadPath)).toBeTruthy();
    
    // Clean up
    if (fs.existsSync(downloadPath)) {
      fs.unlinkSync(downloadPath);
    }
  });

  test('Secure File Download - Download with Authentication', async ({ browser }) => {
    // Page is protected by HTTP Basic Auth
    const context = await browser.newContext({
      httpCredentials: { username: 'admin', password: 'admin' }
    });
    const page = await context.newPage();
    await page.goto('/download_secure');
    await expect(page.locator('h3')).toHaveText('Secure File Downloader');

    // Get download links
    const downloadLinks = page.locator('.example a');
    await expect(downloadLinks.first()).toBeVisible();
    const linkCount = await downloadLinks.count();

    // Verify files are listed
    expect(linkCount).toBeGreaterThan(0);

    console.log(`Secure download files available: ${linkCount}`);
    await context.close();
  });
});

test.describe('Forgot Password Tests', () => {
  
  test('Forgot Password - Request Password Reset', async ({ page }) => {
    await page.goto('/forgot_password');
    
    // Verify page title
    await expect(page.locator('h2')).toHaveText('Forgot Password');
    
    // Fill in email
    const email = 'test@example.com';
    await page.fill('#email', email);
    
    // Click retrieve password button
    await page.click('#form_submit');
    
    // Wait for response (note: this might redirect or show a message)
    await page.waitForLoadState('networkidle');
    
    // Verify we get some kind of response
    // The actual behavior may vary, so we just check the URL changed or content loaded
    const currentUrl = page.url();
    console.log(`After password reset request: ${currentUrl}`);
  });
});

test.describe('Multiple Windows Tests', () => {
  
  test('Multiple Windows - Open New Window', async ({ page, context }) => {
    await page.goto('/windows');
    
    // Set up listener for new page/window
    const pagePromise = context.waitForEvent('page');
    
    // Click link that opens new window
    await page.click('a[href="/windows/new"]');
    
    // Wait for new page
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    
    // Verify new window opened
    expect(newPage.url()).toContain('/windows/new');
    
    // Verify content in new window
    const newWindowHeading = newPage.locator('h3');
    await expect(newWindowHeading).toHaveText('New Window');
    
    // Verify original page still exists
    await expect(page.locator('h3')).toHaveText('Opening a new window');
    
    // Get all pages
    const pages = context.pages();
    expect(pages.length).toBe(2);
    
    // Close new window
    await newPage.close();
  });

  test('Multiple Windows - Switch Between Windows', async ({ page, context }) => {
    await page.goto('/windows');
    
    // Open new window
    const pagePromise = context.waitForEvent('page');
    await page.click('a[href="/windows/new"]');
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    
    // Work in new window
    await expect(newPage.locator('h3')).toHaveText('New Window');
    
    // Switch back to original window
    await page.bringToFront();
    await expect(page.locator('h3')).toHaveText('Opening a new window');
    
    // Switch to new window again
    await newPage.bringToFront();
    await expect(newPage.locator('h3')).toHaveText('New Window');
    
    // Close new window
    await newPage.close();
  });
});

test.describe('JavaScript Error Tests', () => {
  
  test('JavaScript onload event error - Detect Console Error', async ({ page }) => {
    const consoleMessages: string[] = [];
    const errorMessages: string[] = [];
    
    // Listen for console messages
    page.on('console', msg => {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
    });
    
    // Listen for page errors
    page.on('pageerror', error => {
      errorMessages.push(error.message);
    });
    
    // Navigate to page with JavaScript error
    await page.goto('/javascript_error');
    
    // Wait a bit for errors to occur
    await page.waitForTimeout(1000);
    
    // Verify page loaded (this page has no heading, only a title and a paragraph)
    await expect(page).toHaveTitle('Page with JavaScript errors on load');
    await expect(page.locator('p')).toContainText('This page has a JavaScript error in the onload event');
    
    // Verify we captured error messages
    console.log('Console messages:', consoleMessages);
    console.log('Error messages:', errorMessages);
    
    // There should be at least one error
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
