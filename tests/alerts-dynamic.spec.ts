import { test, expect } from '@playwright/test';

test.describe('JavaScript Alerts Tests', () => {
  
  test('JS Alert - Accept Alert', async ({ page }) => {
    await page.goto('/javascript_alerts');
    
    // Set up dialog handler before triggering alert
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept();
    });
    
    // Click button to trigger alert
    await page.click('button:has-text("Click for JS Alert")');
    
    // Verify result
    const result = page.locator('#result');
    await expect(result).toHaveText('You successfully clicked an alert');
  });

  test('JS Confirm - Accept', async ({ page }) => {
    await page.goto('/javascript_alerts');
    
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('I am a JS Confirm');
      await dialog.accept();
    });
    
    await page.click('button:has-text("Click for JS Confirm")');
    
    const result = page.locator('#result');
    await expect(result).toHaveText('You clicked: Ok');
  });

  test('JS Confirm - Dismiss', async ({ page }) => {
    await page.goto('/javascript_alerts');
    
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.dismiss();
    });
    
    await page.click('button:has-text("Click for JS Confirm")');
    
    const result = page.locator('#result');
    await expect(result).toHaveText('You clicked: Cancel');
  });

  test('JS Prompt - Enter Text', async ({ page }) => {
    await page.goto('/javascript_alerts');
    
    const testText = 'Hello, Playwright!';
    
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe('I am a JS prompt');
      await dialog.accept(testText);
    });
    
    await page.click('button:has-text("Click for JS Prompt")');
    
    const result = page.locator('#result');
    await expect(result).toHaveText(`You entered: ${testText}`);
  });
});

test.describe('Dynamic Content Tests', () => {
  
  test('Dynamic Loading - Hidden Element', async ({ page }) => {
    await page.goto('/dynamic_loading/1');
    
    // Click start button
    await page.click('button:has-text("Start")');
    
    // Wait for loading indicator
    const loading = page.locator('#loading');
    await expect(loading).toBeVisible();
    
    // Wait for element to be revealed
    const finishText = page.locator('#finish h4');
    await expect(finishText).toBeVisible({ timeout: 10000 });
    await expect(finishText).toHaveText('Hello World!');
  });

  test('Dynamic Loading - Rendered Element', async ({ page }) => {
    await page.goto('/dynamic_loading/2');
    
    // Click start button
    await page.click('button:has-text("Start")');
    
    // Wait for loading to complete and element to be rendered
    const finishText = page.locator('#finish h4');
    await expect(finishText).toBeVisible({ timeout: 10000 });
    await expect(finishText).toHaveText('Hello World!');
  });

  test('Dynamic Controls - Remove/Add Checkbox', async ({ page }) => {
    await page.goto('/dynamic_controls');
    
    // The re-added checkbox is <input id="checkbox"> (no wrapper), so scope to the form
    const checkbox = page.locator('#checkbox-example input[type="checkbox"]');
    const removeButton = page.locator('button:has-text("Remove")');
    const addButton = page.locator('button:has-text("Add")');
    const message = page.locator('#message');
    
    // Verify checkbox is present
    await expect(checkbox).toBeVisible();
    
    // Remove checkbox
    await removeButton.click();
    await expect(message).toHaveText("It's gone!");
    await expect(checkbox).not.toBeVisible();
    
    // Add checkbox back
    await addButton.click();
    await expect(message).toHaveText("It's back!");
    await expect(checkbox).toBeVisible();
  });

  test('Dynamic Controls - Enable/Disable Input', async ({ page }) => {
    await page.goto('/dynamic_controls');
    
    const inputField = page.locator('input[type="text"]');
    const enableButton = page.locator('button:has-text("Enable")');
    const disableButton = page.locator('button:has-text("Disable")');
    const message = page.locator('#message');
    
    // Verify input is disabled
    await expect(inputField).toBeDisabled();
    
    // Enable input
    await enableButton.click();
    await expect(message).toHaveText("It's enabled!");
    await expect(inputField).toBeEnabled();
    
    // Type in input
    await inputField.fill('Test input');
    await expect(inputField).toHaveValue('Test input');
    
    // Disable input
    await disableButton.click();
    await expect(message).toHaveText("It's disabled!");
    await expect(inputField).toBeDisabled();
  });
});
