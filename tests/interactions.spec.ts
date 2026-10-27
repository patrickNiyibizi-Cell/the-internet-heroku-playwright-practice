import { test, expect } from '@playwright/test';

test.describe('Drag and Drop Tests', () => {
  
  test('Drag and Drop - Swap Elements', async ({ page, browserName }) => {
    await page.goto('/drag_and_drop');
    
    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');
    
    // Verify initial state
    await expect(columnA).toHaveText('A');
    await expect(columnB).toHaveText('B');
    
    // Drag column A to column B
    if (browserName === 'webkit') {
      // WebKit doesn't fire native HTML5 drag events from mouse actions, so dispatch them directly
      const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
      await columnA.dispatchEvent('dragstart', { dataTransfer });
      await columnB.dispatchEvent('dragenter', { dataTransfer });
      await columnB.dispatchEvent('dragover', { dataTransfer });
      await columnB.dispatchEvent('drop', { dataTransfer });
      await columnA.dispatchEvent('dragend', { dataTransfer });
    } else {
      await columnA.dragTo(columnB);
    }
    
    // Verify elements are swapped
    await expect(columnA).toHaveText('B');
    await expect(columnB).toHaveText('A');
  });
});

test.describe('Hover Tests', () => {
  
  test('Hovers - Show User Information', async ({ page }) => {
    await page.goto('/hovers');
    
    const figures = page.locator('.figure');
    
    // Hover over first user
    await figures.nth(0).hover();
    const user1Caption = figures.nth(0).locator('.figcaption');
    await expect(user1Caption).toBeVisible();
    await expect(user1Caption).toContainText('name: user1');
    
    // Hover over second user
    await figures.nth(1).hover();
    const user2Caption = figures.nth(1).locator('.figcaption');
    await expect(user2Caption).toBeVisible();
    await expect(user2Caption).toContainText('name: user2');
    
    // Hover over third user
    await figures.nth(2).hover();
    const user3Caption = figures.nth(2).locator('.figcaption');
    await expect(user3Caption).toBeVisible();
    await expect(user3Caption).toContainText('name: user3');
  });
});

test.describe('Frames Tests', () => {
  
  test('Nested Frames - Access Frame Content', async ({ page }) => {
    await page.goto('/nested_frames');
    
    // Access top frame
    const topFrame = page.frameLocator('frame[name="frame-top"]');
    
    // Access left frame within top frame
    const leftFrame = topFrame.frameLocator('frame[name="frame-left"]');
    const leftBody = leftFrame.locator('body');
    await expect(leftBody).toContainText('LEFT');
    
    // Access middle frame within top frame
    const middleFrame = topFrame.frameLocator('frame[name="frame-middle"]');
    const middleBody = middleFrame.locator('body');
    await expect(middleBody).toContainText('MIDDLE');
    
    // Access right frame within top frame
    const rightFrame = topFrame.frameLocator('frame[name="frame-right"]');
    const rightBody = rightFrame.locator('body');
    await expect(rightBody).toContainText('RIGHT');
    
    // Access bottom frame
    const bottomFrame = page.frameLocator('frame[name="frame-bottom"]');
    const bottomBody = bottomFrame.locator('body');
    await expect(bottomBody).toContainText('BOTTOM');
  });

  test('iFrame - Edit Content', async ({ page }) => {
    await page.goto('/iframe');
    
    // Access the iframe
    const iframe = page.frameLocator('#mce_0_ifr');
    const editor = iframe.locator('body#tinymce');
    
    // Clear existing content
    await editor.clear();
    
    // Type new content
    const testContent = 'Hello from Playwright!';
    await editor.fill(testContent);
    
    // Verify content
    await expect(editor).toContainText(testContent);
  });
});

test.describe('Context Menu Tests', () => {
  
  test('Context Menu - Right Click', async ({ page }) => {
    await page.goto('/context_menu');
    
    const hotSpot = page.locator('#hot-spot');
    
    // Set up alert handler
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('You selected a context menu');
      await dialog.accept();
    });
    
    // Right click on the hot spot
    await hotSpot.click({ button: 'right' });
  });
});

test.describe('Key Presses Tests', () => {
  
  test('Key Presses - Detect Key Events', async ({ page }) => {
    await page.goto('/key_presses');
    
    const inputField = page.locator('#target');
    const result = page.locator('#result');
    
    // Press letter A in the input
    await inputField.press('A');
    await expect(result).toHaveText('You entered: A');

    // Press Space
    await inputField.press('Space');
    await expect(result).toHaveText('You entered: SPACE');

    // Press Escape
    await inputField.press('Escape');
    await expect(result).toHaveText('You entered: ESCAPE');

    // Press Tab (moves focus out of the input)
    await inputField.press('Tab');
    await expect(result).toHaveText('You entered: TAB');

    // Press Enter outside the input - Enter inside it submits the form and reloads the page.
    // The page listens for keydown on the whole document.
    await inputField.blur();
    await page.keyboard.press('Enter');
    await expect(result).toHaveText('You entered: ENTER');
  });
});
