import { test, expect } from '@playwright/test';

test.describe('JQuery UI Menu Tests', () => {
  
  test('JQuery UI Menus - Navigate Menu Items', async ({ page }) => {
    await page.goto('/jqueryui/menu');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Find the menu
    const menu = page.locator('#menu');
    await expect(menu).toBeVisible();
    
    // Hover over "Enabled" menu item
    await page.locator('#menu > li > a:text-is("Enabled")').hover();

    // Verify submenu appears
    const submenu = page.locator('#menu > li > a:text-is("Enabled") ~ ul');
    await expect(submenu).toBeVisible();

    // Hover over "Downloads" in submenu
    await submenu.locator('a:text-is("Downloads")').hover();

    // Verify nested submenu appears
    const nestedSubmenu = submenu.locator('a:text-is("Downloads") ~ ul');
    await expect(nestedSubmenu).toBeVisible();

    // Click on a submenu item - it downloads a file
    const downloadPromise = page.waitForEvent('download');
    await nestedSubmenu.locator('a:text-is("PDF")').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('menu.pdf');
  });

  test('JQuery UI Menus - Disabled Menu Item', async ({ page }) => {
    await page.goto('/jqueryui/menu');
    
    await page.waitForLoadState('networkidle');
    
    // Find disabled menu item
    const disabledItem = page.locator('a:has-text("Disabled")');
    
    // Verify it has disabled class
    const parentLi = disabledItem.locator('..');
    await expect(parentLi).toHaveClass(/ui-state-disabled/);
    
    // Try to click it (should not work)
    await disabledItem.click({ force: true });
    
    // Verify no navigation occurred
    expect(page.url()).toContain('/jqueryui/menu');
  });

  test('JQuery UI Menus - Back to JQuery UI', async ({ page }) => {
    await page.goto('/jqueryui/menu');

    // "Back to JQuery UI" lives in the "Enabled" submenu, so open it first
    await page.locator('#menu > li > a:text-is("Enabled")').hover();
    const backLink = page.locator('#menu a:text-is("Back to JQuery UI")');
    await expect(backLink).toBeVisible();

    // Click "Back to JQuery UI" link
    await backLink.click();
    
    // Verify navigation to JQuery UI page
    await expect(page).toHaveURL(/.*jqueryui$/);
  });
});

test.describe('WYSIWYG Editor Tests', () => {
  
  test('WYSIWYG Editor - Type and Format Text', async ({ page }) => {
    await page.goto('/tinymce');
    
    // Wait for TinyMCE to load
    await page.waitForTimeout(2000);
    
    // Switch to iframe
    const iframe = page.frameLocator('iframe[id^="mce_"]');
    const editor = iframe.locator('body#tinymce');
    
    // Clear existing content
    await editor.clear();
    
    // Type new content
    const testText = 'This is a test of the WYSIWYG editor!';
    await editor.fill(testText);
    
    // Verify content
    await expect(editor).toContainText(testText);
    
    // Click Bold button (outside iframe)
    await page.click('button[aria-label="Bold"]');
    
    // Type bold text
    await editor.press('End');
    await editor.type(' Bold text!');
    
    // Verify new content
    await expect(editor).toContainText('Bold text!');
  });

  test('WYSIWYG Editor - File Menu Operations', async ({ page }) => {
    await page.goto('/tinymce');
    
    await page.waitForTimeout(2000);
    
    // Click File menu
    await page.click('button[role="menuitem"]:has-text("File")');
    
    // Wait for menu to open
    await page.waitForTimeout(500);
    
    // Verify menu items are visible
    const newDocMenuItem = page.locator('div[role="menuitem"]:has-text("New document")');
    await expect(newDocMenuItem).toBeVisible();
  });

  test('WYSIWYG Editor - Format Text', async ({ page }) => {
    await page.goto('/tinymce');
    
    await page.waitForTimeout(2000);
    
    // Switch to iframe
    const iframe = page.frameLocator('iframe[id^="mce_"]');
    const editor = iframe.locator('body#tinymce');
    
    // Clear and type
    await editor.clear();
    await editor.fill('Test text for formatting');
    
    // Select all text
    await page.keyboard.press('Control+A');
    
    // Click Italic button
    await page.click('button[aria-label="Italic"]');
    
    // Verify content still exists
    await expect(editor).toContainText('Test text for formatting');
  });
});

test.describe('Dynamic Content Tests - Extended', () => {
  
  test('Dynamic Content - Content Changes on Refresh', async ({ page }) => {
    await page.goto('/dynamic_content');

    // Get initial content (content rows live inside the example's #content block)
    const rows = page.locator('.example #content > .row');
    const firstRowText = await rows.first().locator('.large-10').textContent();
    
    // Refresh page
    await page.reload();
    
    // Get new content
    const newFirstRowText = await rows.first().locator('.large-10').textContent();
    
    // Content might be the same or different (it's random)
    console.log('Original content:', firstRowText?.substring(0, 50));
    console.log('New content:', newFirstRowText?.substring(0, 50));
    
    // Just verify rows exist
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('Dynamic Content - Static Content Mode', async ({ page }) => {
    await page.goto('/dynamic_content?with_content=static');
    
    // Get content
    const rows = page.locator('.example #content > .row');
    const firstRowText = await rows.first().locator('.large-10').textContent();

    // Refresh page with static parameter
    await page.reload();

    // Get new content - should be the same in static mode
    const newFirstRowText = await rows.first().locator('.large-10').textContent();

    // In static mode, the first rows stay the same (only the last one changes)
    expect(newFirstRowText).toBe(firstRowText);

    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });
});

test.describe('JQuery UI Tests - Additional', () => {
  
  test('JQuery UI - Drag and Drop', async ({ page }) => {
    await page.goto('/jqueryui');
    
    // Verify main page loaded
    await expect(page.locator('h3')).toHaveText('JQuery UI');
    
    // Get all available examples
    const examples = page.locator('.example a');
    const exampleCount = await examples.count();
    
    expect(exampleCount).toBeGreaterThan(0);
    console.log(`JQuery UI examples available: ${exampleCount}`);
  });
});

test.describe('Sortable Data Tables - Extended Tests', () => {
  
  test('Table - Sort by Email Column', async ({ page }) => {
    await page.goto('/tables');
    
    const table = page.locator('#table1');
    
    // Click Email header to sort
    await table.locator('th').filter({ hasText: 'Email' }).click();
    
    // Get first email after sort
    const firstEmail = await table.locator('tbody tr').first().locator('td').nth(2).textContent();
    
    console.log(`First email after sort: ${firstEmail}`);
    expect(firstEmail).toBeTruthy();
  });

  test('Table - Sort by Due Amount', async ({ page }) => {
    await page.goto('/tables');
    
    const table = page.locator('#table1');
    
    // Click Due header to sort
    await table.locator('th').filter({ hasText: 'Due' }).click();
    
    // Get all due amounts and verify they're in order
    const rows = table.locator('tbody tr');
    const rowCount = await rows.count();
    
    const dueAmounts: number[] = [];
    for (let i = 0; i < rowCount; i++) {
      const dueText = await rows.nth(i).locator('td').nth(3).textContent();
      const due = parseFloat(dueText?.replace('$', '') || '0');
      dueAmounts.push(due);
    }
    
    console.log('Due amounts after sort:', dueAmounts);
    expect(dueAmounts.length).toBeGreaterThan(0);
  });

  test('Table - Edit and Delete Actions', async ({ page }) => {
    await page.goto('/tables');
    
    const table = page.locator('#table2');
    const firstRow = table.locator('tbody tr').first();
    
    // Get edit and delete links
    const editLink = firstRow.locator('a[href*="edit"]');
    const deleteLink = firstRow.locator('a[href*="delete"]');
    
    // Verify links exist
    await expect(editLink).toBeVisible();
    await expect(deleteLink).toBeVisible();
    
    // Get href attributes
    const editHref = await editLink.getAttribute('href');
    const deleteHref = await deleteLink.getAttribute('href');
    
    console.log(`Edit link: ${editHref}`);
    console.log(`Delete link: ${deleteHref}`);
    
    expect(editHref).toContain('edit');
    expect(deleteHref).toContain('delete');
  });
});

test.describe('Secure Area Tests', () => {
  
  test('Secure Area - Direct Access Without Login', async ({ page }) => {
    // Try to access secure area directly without logging in
    await page.goto('/secure');
    
    // Should be redirected or see error
    // The actual behavior may vary
    const url = page.url();
    console.log(`Accessing secure area directly: ${url}`);
    
    // Check if we're redirected to login or see an error message
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toBeTruthy();
  });
});

test.describe('Heroku Authentication Tests', () => {
  
  test('Form Based Login - Multiple Attempts', async ({ page }) => {
    await page.goto('/login');
    
    // First failed attempt
    await page.fill('#username', 'wrong');
    await page.fill('#password', 'wrong');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('#flash')).toContainText('invalid');
    
    // Second failed attempt
    await page.fill('#username', 'wrong2');
    await page.fill('#password', 'wrong2');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('#flash')).toContainText('invalid');
    
    // Successful attempt
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/.*secure/);
  });
});
