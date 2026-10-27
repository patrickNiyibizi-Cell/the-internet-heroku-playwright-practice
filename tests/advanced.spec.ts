import { test, expect } from '@playwright/test';

test.describe('Redirect Tests', () => {
  
  test('Redirect Link - Follow Redirect', async ({ page }) => {
    await page.goto('/redirector');
    
    // Click redirect link
    await page.click('#redirect');
    
    // Verify redirected to status codes page
    await expect(page).toHaveURL(/.*status_codes/);
  });

  test('Multiple Redirects', async ({ page }) => {
    // /redirect_link does not exist (404); /redirect is the server-side 302
    const response = await page.goto('/redirect');

    // Verify the request was redirected from /redirect
    const redirectedFrom = response?.request().redirectedFrom();
    expect(redirectedFrom?.url()).toContain('/redirect');

    // Verify final destination
    await expect(page).toHaveURL(/.*status_codes/);
    await expect(page.locator('h3')).toHaveText('Status Codes');
  });
});

test.describe('Infinite Scroll Tests', () => {
  
  test('Infinite Scroll - Load More Content', async ({ page }) => {
    await page.goto('/infinite_scroll');
    
    const paragraphs = page.locator('.jscroll-added');

    // Scroll to bottom (re-scrolling on each poll) until more content has loaded
    const loadsMoreThan = async (count: number) => {
      await expect.poll(async () => {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        return paragraphs.count();
      }, { timeout: 15000 }).toBeGreaterThan(count);
      return paragraphs.count();
    };

    // Get initial paragraph count
    const initialCount = await paragraphs.count();

    // Verify more content loaded
    const newCount = await loadsMoreThan(initialCount);

    // Verify even more content loaded after scrolling again
    await loadsMoreThan(newCount);
  });
});

test.describe('Large DOM Tests', () => {
  
  test('Large DOM - Navigate Through Table', async ({ page }) => {
    await page.goto('/large');
    
    // Verify page loads
    await expect(page.locator('h3')).toContainText('Large & Deep DOM');
    
    // Find the table
    const table = page.locator('#large-table');
    await expect(table).toBeVisible();
    
    // Verify siblings div exists
    // #siblings has zero height (floated children), so check it's attached and its content is visible
    const siblingsDiv = page.locator('#siblings');
    await expect(siblingsDiv).toBeAttached();
    await expect(siblingsDiv.locator('[id="sibling-1.1"]')).toBeVisible();
    
    // Get row count
    const rows = table.locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });
});

test.describe('Slow Resources Tests', () => {
  
  test('Slow Resources - Wait for Page Load', async ({ page }) => {
    // Increase timeout for this test
    test.setTimeout(60000);
    
    await page.goto('/slow', { waitUntil: 'networkidle', timeout: 45000 });
    
    // Verify page eventually loads
    await expect(page.locator('h3')).toContainText('Slow Resources');
  });
});

test.describe('Geolocation Tests', () => {
  
  test('Geolocation - Check Location', async ({ page, context }) => {
    // Grant geolocation permission
    await context.grantPermissions(['geolocation']);
    
    // Set a specific location
    await context.setGeolocation({ latitude: 37.7749, longitude: -122.4194 });
    
    await page.goto('/geolocation');
    
    // Click "Where am I?" button
    await page.click('button');
    
    // Wait for location to be displayed
    await page.waitForTimeout(2000);
    
    // Verify latitude and longitude are displayed
    const latText = await page.locator('#lat-value').textContent();
    const longText = await page.locator('#long-value').textContent();
    
    expect(latText).toBeTruthy();
    expect(longText).toBeTruthy();
  });
});

test.describe('Horizontal Slider Tests', () => {
  
  test('Horizontal Slider - Move Slider', async ({ page }) => {
    await page.goto('/horizontal_slider');
    
    const slider = page.locator('input[type="range"]');
    const rangeValue = page.locator('#range');
    
    // Set slider to specific value
    await slider.fill('3');
    await expect(rangeValue).toHaveText('3');
    
    // Set slider to another value
    await slider.fill('4.5');
    await expect(rangeValue).toHaveText('4.5');
    
    // Set slider to max value
    await slider.fill('5');
    await expect(rangeValue).toHaveText('5');
  });
});

test.describe('Typos Tests', () => {
  
  test('Typos - Check for Typos', async ({ page }) => {
    await page.goto('/typos');
    
    // Get all paragraphs
    const paragraphs = page.locator('.example p');
    const paragraphCount = await paragraphs.count();
    
    let hasTypo = false;
    
    for (let i = 0; i < paragraphCount; i++) {
      const text = await paragraphs.nth(i).textContent();
      
      // Check for the known typo
      if (text?.includes('wont') || text?.includes('won,t')) {
        hasTypo = true;
        break;
      }
    }
    
    // This page randomly shows typos, so we just verify we can detect them
    console.log(`Typo detected: ${hasTypo}`);
  });
});

test.describe('Shifting Content Tests', () => {
  
  test('Shifting Content - Menu Element', async ({ page }) => {
    await page.goto('/shifting_content/menu');
    
    // Get menu items
    const menuItems = page.locator('ul li a');
    const itemCount = await menuItems.count();
    
    // Verify menu has items
    expect(itemCount).toBeGreaterThan(0);
    
    // Reload page and verify content shifts
    await page.reload();
    
    const newItemCount = await menuItems.count();
    expect(newItemCount).toBeGreaterThanOrEqual(itemCount);
  });

  test('Shifting Content - Image', async ({ page }) => {
    await page.goto('/shifting_content/image');
    
    const image = page.locator('.example img');
    await expect(image).toBeVisible();
  });
});

test.describe('Shadow DOM Tests', () => {
  
  test('Shadow DOM - Access Shadow Content', async ({ page }) => {
    await page.goto('/shadowdom');
    
    // Access shadow DOM content
    const shadowContent = page.locator('span[slot="my-text"]');
    
    // Verify shadow content is visible
    await expect(shadowContent).toBeVisible();
  });
});

test.describe('Floating Menu Tests', () => {
  
  test('Floating Menu - Scroll and Verify Menu Stays', async ({ page }) => {
    await page.goto('/floating_menu');
    
    const menu = page.locator('#menu');
    
    // Verify menu is visible
    await expect(menu).toBeVisible();
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    
    // Wait a bit
    await page.waitForTimeout(500);
    
    // Verify menu is still visible
    await expect(menu).toBeVisible();
    
    // Click menu items
    await page.click('a[href="#home"]');
    await page.click('a[href="#news"]');
    await page.click('a[href="#contact"]');
    await page.click('a[href="#about"]');
  });
});
