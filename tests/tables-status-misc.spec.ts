import { test, expect } from '@playwright/test';

test.describe('Tables Tests', () => {
  
  test('Sortable Data Table - Verify Data', async ({ page }) => {
    await page.goto('/tables');
    
    // Table 1 - Read data from first row
    const table1 = page.locator('#table1');
    const firstRow = table1.locator('tbody tr').first();
    
    await expect(firstRow.locator('td').nth(0)).toContainText('Smith');
    await expect(firstRow.locator('td').nth(1)).toContainText('John');
    
    // Sort by Last Name (click header)
    await table1.locator('th').filter({ hasText: 'Last Name' }).click();
    
    // Verify first row after sort
    const firstRowAfterSort = table1.locator('tbody tr').first();
    await expect(firstRowAfterSort.locator('td').nth(0)).toContainText('Bach');
  });

  test('Sortable Data Table - Find Largest Due', async ({ page }) => {
    await page.goto('/tables');
    
    const table1 = page.locator('#table1');
    const rows = table1.locator('tbody tr');
    
    // Get all due amounts and find the person with largest due
    const rowCount = await rows.count();
    let maxDue = 0;
    let maxDuePerson = '';
    
    for (let i = 0; i < rowCount; i++) {
      const dueText = await rows.nth(i).locator('td').nth(3).textContent();
      const due = parseFloat(dueText?.replace('$', '') || '0');
      
      if (due > maxDue) {
        maxDue = due;
        const lastName = await rows.nth(i).locator('td').nth(0).textContent();
        const firstName = await rows.nth(i).locator('td').nth(1).textContent();
        maxDuePerson = `${lastName} ${firstName}`;
      }
    }
    
    // Verify the person with largest due
    expect(maxDuePerson).toContain('Doe');
  });
});

test.describe('Status Codes Tests', () => {
  
  test('Status Codes - 200 OK', async ({ page }) => {
    await page.goto('/status_codes');
    
    // Click on 200 link
    await page.click('a[href="status_codes/200"]');
    
    // Verify page content
    await expect(page.locator('p')).toContainText('200');
  });

  test('Status Codes - 301 Moved Permanently', async ({ page }) => {
    await page.goto('/status_codes');
    
    // Click on 301 link
    await page.click('a[href="status_codes/301"]');
    
    // Verify page content
    await expect(page.locator('p')).toContainText('301');
  });

  test('Status Codes - 404 Not Found', async ({ page }) => {
    await page.goto('/status_codes');
    
    // Click on 404 link
    await page.click('a[href="status_codes/404"]');
    
    // Verify page content
    await expect(page.locator('p')).toContainText('404');
  });

  test('Status Codes - 500 Internal Server Error', async ({ page }) => {
    await page.goto('/status_codes');
    
    // Click on 500 link
    await page.click('a[href="status_codes/500"]');
    
    // Verify page content
    await expect(page.locator('p')).toContainText('500');
  });
});

test.describe('Miscellaneous Tests', () => {
  
  test('Broken Images - Detect Broken Images', async ({ page }) => {
    await page.goto('/broken_images');
    
    const images = page.locator('.example img');
    const imageCount = await images.count();
    
    let brokenCount = 0;
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      
      if (naturalWidth === 0) {
        brokenCount++;
      }
    }
    
    // Verify that there are broken images
    expect(brokenCount).toBeGreaterThan(0);
  });

  test('Challenging DOM - Interact with Elements', async ({ page }) => {
    await page.goto('/challenging_dom');
    
    // Click the buttons
    const button1 = page.locator('a.button').first();
    const button2 = page.locator('a.button.alert').first();
    const button3 = page.locator('a.button.success').first();
    
    await button1.click();
    await button2.click();
    await button3.click();
    
    // Verify table exists and has data
    const table = page.locator('table');
    await expect(table).toBeVisible();
    
    const rows = table.locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    
    // Click edit on first row
    await rows.first().locator('a[href^="#edit"]').click();
    
    // Click delete on first row
    await rows.first().locator('a[href^="#delete"]').click();
  });

  test('Disappearing Elements - Check Menu Items', async ({ page }) => {
    await page.goto('/disappearing_elements');
    
    const menuItems = page.locator('ul li a');
    const itemCount = await menuItems.count();
    
    // Verify at least 4 menu items exist
    expect(itemCount).toBeGreaterThanOrEqual(4);
    
    // Click on each visible menu item
    for (let i = 0; i < itemCount; i++) {
      const item = menuItems.nth(i);
      const text = await item.textContent();
      console.log(`Menu item ${i + 1}: ${text}`);
    }
  });

  test('Entry Ad - Close Modal', async ({ page }) => {
    await page.goto('/entry_ad');
    
    // Wait for modal to appear
    const modal = page.locator('.modal');
    await expect(modal).toBeVisible({ timeout: 5000 });
    
    // Close the modal
    const closeButton = page.locator('.modal-footer p');
    await closeButton.click();
    
    // Verify modal is closed
    await expect(modal).not.toBeVisible();
  });

  test('Exit Intent - Trigger Exit Modal', async ({ page }) => {
    await page.goto('/exit_intent');
    
    // Move mouse out of viewport to trigger exit intent
    await page.mouse.move(0, 0);
    await page.mouse.move(0, -100);
    
    // Wait for modal to appear
    const modal = page.locator('.modal');
    await expect(modal).toBeVisible({ timeout: 5000 });
    
    // Verify modal content
    await expect(modal).toContainText('This is a modal window');
    
    // Close the modal
    const closeButton = page.locator('.modal-footer p');
    await closeButton.click();
  });

  test('Notification Messages - Verify Messages', async ({ page }) => {
    await page.goto('/notification_message_rendered');
    
    // Click to load new message
    await page.click('a[href="/notification_message"]');
    
    // Verify notification appears
    const notification = page.locator('#flash');
    await expect(notification).toBeVisible();
    
    // Verify it contains one of the expected messages
    const notificationText = await notification.textContent();
    const expectedMessages = [
      'Action successful',
      'Action unsuccesful, please try again',
      'Action Unsuccessful'
    ];
    
    const containsExpectedMessage = expectedMessages.some(msg => 
      notificationText?.includes(msg)
    );
    expect(containsExpectedMessage).toBeTruthy();
  });
});
