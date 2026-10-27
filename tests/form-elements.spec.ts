import { test, expect } from '@playwright/test';

test.describe('Form Elements Tests', () => {
  
  test('Checkboxes - Check and Uncheck', async ({ page }) => {
    await page.goto('/checkboxes');
    
    const checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    const checkbox2 = page.locator('input[type="checkbox"]').nth(1);
    
    // Verify initial states
    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).toBeChecked();
    
    // Check first checkbox
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();
    
    // Uncheck second checkbox
    await checkbox2.uncheck();
    await expect(checkbox2).not.toBeChecked();
    
    // Check both checkboxes
    await checkbox1.check();
    await checkbox2.check();
    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).toBeChecked();
  });

  test('Dropdown - Select Options', async ({ page }) => {
    await page.goto('/dropdown');
    
    const dropdown = page.locator('#dropdown');
    
    // Select Option 1
    await dropdown.selectOption('1');
    await expect(dropdown).toHaveValue('1');
    
    // Select Option 2
    await dropdown.selectOption('2');
    await expect(dropdown).toHaveValue('2');
    
    // Verify selected option text
    const selectedOption = dropdown.locator('option:checked');
    await expect(selectedOption).toHaveText('Option 2');
  });

  test('Input Fields - Type and Clear', async ({ page }) => {
    await page.goto('/inputs');
    
    const inputField = page.locator('input[type="number"]');
    
    // Type number
    await inputField.fill('12345');
    await expect(inputField).toHaveValue('12345');
    
    // Clear and type new number
    await inputField.clear();
    await inputField.fill('67890');
    await expect(inputField).toHaveValue('67890');
    
    // Type negative number
    await inputField.clear();
    await inputField.fill('-100');
    await expect(inputField).toHaveValue('-100');
  });

  test('File Upload', async ({ page }) => {
    await page.goto('/upload');
    
    // Create a temporary file to upload
    const fileInput = page.locator('#file-upload');
    
    // Set input files
    await fileInput.setInputFiles({
      name: 'test-file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('This is a test file for upload')
    });
    
    // Click upload button
    await page.click('#file-submit');
    
    // Verify upload success
    await expect(page.locator('h3')).toHaveText('File Uploaded!');
    await expect(page.locator('#uploaded-files')).toContainText('test-file.txt');
  });

  test('Add/Remove Elements', async ({ page }) => {
    await page.goto('/add_remove_elements/');
    
    const addButton = page.locator('button').filter({ hasText: 'Add Element' });
    
    // Initially no delete buttons should exist
    const deleteButtons = page.locator('.added-manually');
    await expect(deleteButtons).toHaveCount(0);
    
    // Add 3 elements
    await addButton.click();
    await addButton.click();
    await addButton.click();
    
    // Verify 3 delete buttons exist
    await expect(deleteButtons).toHaveCount(3);
    
    // Remove one element
    await deleteButtons.first().click();
    
    // Verify 2 delete buttons remain
    await expect(deleteButtons).toHaveCount(2);
    
    // Remove all remaining elements
    await deleteButtons.first().click();
    await deleteButtons.first().click();
    
    // Verify no delete buttons exist
    await expect(deleteButtons).toHaveCount(0);
  });
});
