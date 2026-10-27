# 100 Playwright Test Automation Interview Questions
## For Senior Test Automation Engineer (10+ Years Experience)

---

## 📚 Table of Contents
1. Playwright Fundamentals (Questions 1-15)
2. TypeScript & JavaScript (Questions 16-25)
3. Test Architecture & Design Patterns (Questions 26-35)
4. Authentication & Security (Questions 36-40)
5. Form Interactions & Dynamic Content (Questions 41-50)
6. Advanced Interactions (Questions 51-60)
7. iFrames, Windows & Navigation (Questions 61-65)
8. API Testing & Network (Questions 66-70)
9. Performance & Debugging (Questions 71-75)
10. CI/CD & DevOps (Questions 76-80)
11. Framework Design & Best Practices (Questions 81-90)
12. Leadership & Strategy (Questions 91-100)

---

## 1️⃣ Playwright Fundamentals (Questions 1-15)

### Q1. What are the key differences between Playwright, Selenium, and Cypress? When would you choose Playwright over the others?
**Expected Answer:**
- Playwright: Multi-browser (Chromium, Firefox, WebKit), auto-wait, parallel execution, network interception
- Selenium: Older, requires explicit waits, slower
- Cypress: JavaScript only, runs in browser, no multi-tab support
- Choose Playwright for: Cross-browser, modern apps, parallel tests, API mocking

### Q2. Explain Playwright's auto-waiting mechanism. How does it differ from explicit waits in Selenium?
**Expected Answer:**
- Playwright automatically waits for elements to be actionable
- Checks: attached to DOM, visible, stable, enabled, not covered
- No need for `waitForElement` in most cases
- Built-in retry mechanisms
- More reliable than Selenium's WebDriverWait

### Q3. How do you configure Playwright to run tests across multiple browsers in parallel?
**Expected Answer:**
```typescript
// playwright.config.ts
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
],
fullyParallel: true,
workers: 4
```

### Q4. What is the difference between `page.locator()` and `page.$()` in Playwright?
**Expected Answer:**
- `page.locator()`: Returns Locator (lazy, auto-retries, recommended)
- `page.$()`: Returns ElementHandle (eager, no auto-wait, legacy)
- Locators are auto-waiting and safer
- ElementHandles can become stale

### Q5. How would you handle flaky tests in Playwright? Give at least 5 strategies.
**Expected Answer:**
1. Use proper locators (avoid XPath with indexes)
2. Leverage auto-waiting instead of `waitForTimeout`
3. Configure retries in config
4. Use `page.waitForLoadState('networkidle')`
5. Increase actionability timeout for slow elements
6. Add proper error messages
7. Use `test.fixme()` for known issues

### Q6. Explain Playwright's test fixtures. How do they differ from beforeEach/afterEach?
**Expected Answer:**
- Fixtures provide setup/teardown with dependency injection
- Built-in fixtures: `page`, `context`, `browser`
- Custom fixtures for data, authentication, mocks
- More composable than hooks
- Can be used selectively per test

### Q7. How do you implement Page Object Model in Playwright with TypeScript?
**Expected Answer:**
```typescript
export class LoginPage {
  constructor(private page: Page) {}
  
  private usernameInput = this.page.locator('#username');
  private passwordInput = this.page.locator('#password');
  private submitButton = this.page.locator('button[type="submit"]');
  
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

### Q8. What are the different types of locators in Playwright? Which should be preferred and why?
**Expected Answer:**
- `getByRole()` - Most resilient (accessibility)
- `getByText()` - User-facing text
- `getByLabel()` - Form labels
- `getByTestId()` - test-id attributes
- CSS/XPath - Less preferred
- Prefer role/text/label for accessibility and maintainability

### Q9. How do you handle authentication in Playwright tests? Explain at least 3 methods.
**Expected Answer:**
1. **State reuse**: Save auth state, reuse across tests
2. **API login**: Login via API, get cookies
3. **UI login once**: Use setup project
4. **HTTP Basic Auth**: Pass in URL
Example:
```typescript
// Save auth state
await context.storageState({ path: 'auth.json' });
// Reuse
await context.newContext({ storageState: 'auth.json' });
```

### Q10. What is test isolation in Playwright and why is it important?
**Expected Answer:**
- Each test gets fresh browser context
- No shared cookies/localStorage between tests
- Prevents test interdependency
- Parallel execution safe
- Use `context.storageState()` to share auth efficiently

### Q11. How would you test file downloads in Playwright?
**Expected Answer:**
```typescript
const downloadPromise = page.waitForEvent('download');
await page.click('a#download');
const download = await downloadPromise;
const path = await download.path();
// Verify file exists and content
const content = fs.readFileSync(path, 'utf-8');
expect(content).toContain('expected');
```

### Q12. Explain Playwright's network interception capabilities. How is it different from tools like Mock Service Worker?
**Expected Answer:**
- `page.route()` intercepts and modifies requests
- Can mock API responses
- Can block resources (images, CSS)
- Difference from MSW: Playwright is browser-level, MSW is service worker
- Playwright better for E2E, MSW better for development

### Q13. How do you debug failing Playwright tests? List all available methods.
**Expected Answer:**
1. `--debug` flag with Playwright Inspector
2. `--headed` to see browser
3. `--ui` mode for interactive debugging
4. `page.pause()` for breakpoints
5. Screenshots/videos on failure
6. Trace viewer for post-mortem
7. `--trace on` for detailed traces
8. VS Code debugger

### Q14. What is the difference between `expect(locator).toBeVisible()` and `expect(locator).toHaveCount()`?
**Expected Answer:**
- `toBeVisible()`: Element exists and is visible (display, opacity)
- `toHaveCount()`: Number of matching elements
- `toBeVisible()` fails if element hidden
- `toHaveCount(0)` checks element doesn't exist
- Different use cases for different assertions

### Q15. How would you implement data-driven testing in Playwright?
**Expected Answer:**
```typescript
const testData = [
  { username: 'user1', password: 'pass1', expected: 'Welcome' },
  { username: 'user2', password: 'pass2', expected: 'Hello' },
];

testData.forEach(({ username, password, expected }) => {
  test(`Login with ${username}`, async ({ page }) => {
    // test logic
  });
});

// Or use test.describe.parallel
```

---

## 2️⃣ TypeScript & JavaScript (Questions 16-25)

### Q16. Why use TypeScript for test automation instead of JavaScript?
**Expected Answer:**
- Type safety prevents runtime errors
- Better IDE support (autocomplete, refactoring)
- Catches errors at compile time
- Better for large codebases
- Interfaces for test data models

### Q17. Explain async/await in JavaScript. Why is it important for Playwright?
**Expected Answer:**
- Handles asynchronous operations
- Makes async code look synchronous
- `async` marks function as asynchronous
- `await` pauses execution until promise resolves
- Playwright API is promise-based, requires await
- Cleaner than callbacks or `.then()`

### Q18. What are TypeScript interfaces and how would you use them in test automation?
**Expected Answer:**
```typescript
interface User {
  username: string;
  password: string;
  role: 'admin' | 'user';
}

interface TestData {
  input: User;
  expected: string;
}

async function login(user: User, page: Page) {
  // Type-safe parameters
}
```

### Q19. Explain the difference between `const`, `let`, and `var` in JavaScript.
**Expected Answer:**
- `const`: Block-scoped, cannot reassign
- `let`: Block-scoped, can reassign
- `var`: Function-scoped, hoisted (avoid)
- Prefer `const` by default
- Use `let` only when reassignment needed

### Q20. What are Promises in JavaScript and how do they work?
**Expected Answer:**
- Represents eventual completion/failure of async operation
- Three states: pending, fulfilled, rejected
- `.then()` for success, `.catch()` for errors
- `await` makes it synchronous
- Playwright returns promises for all actions

### Q21. How do you handle errors in async/await code?
**Expected Answer:**
```typescript
try {
  await page.click('#button');
} catch (error) {
  console.error('Click failed:', error);
  // Handle error
}

// Or let it bubble up for test failure
await page.click('#button'); // Throws if fails
```

### Q22. What are TypeScript generics and when would you use them in test frameworks?
**Expected Answer:**
```typescript
class TestDataProvider<T> {
  private data: T[];
  
  add(item: T) { this.data.push(item); }
  get(): T[] { return this.data; }
}

const userProvider = new TestDataProvider<User>();
```
- Reusable, type-safe components
- Data providers, helpers, utilities

### Q23. Explain destructuring in JavaScript with examples from test automation.
**Expected Answer:**
```typescript
// Object destructuring
const { username, password } = testData;

// Array destructuring
const [firstError, secondError] = await page.locator('.error').allTextContents();

// Function parameter destructuring
async function login({ username, password }: User) {}
```

### Q24. What is the difference between `==` and `===` in JavaScript?
**Expected Answer:**
- `==`: Type coercion (loose equality)
- `===`: No type coercion (strict equality)
- Always use `===` to avoid bugs
- Example: `'5' == 5` is true, `'5' === 5` is false

### Q25. How do you organize imports in a TypeScript test project?
**Expected Answer:**
```typescript
// Standard library
import * as fs from 'fs';

// Third-party
import { test, expect, Page } from '@playwright/test';

// Internal
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../data/users';
```
- Group by type
- Use absolute paths via tsconfig
- Barrel exports (index.ts)

---

## 3️⃣ Test Architecture & Design Patterns (Questions 26-35)

### Q26. Describe the Page Object Model pattern. What are its advantages and disadvantages?
**Expected Answer:**
**Advantages:**
- Separation of concerns
- Reusability
- Maintainability
- Single place to update locators

**Disadvantages:**
- Can become bloated
- Over-engineering for small projects
- Steep learning curve

### Q27. What is the difference between Page Object Model and Screenplay Pattern?
**Expected Answer:**
- POM: Page-centric (pages have methods)
- Screenplay: Actor-centric (actors perform tasks)
- Screenplay more flexible for complex workflows
- POM simpler for straightforward apps

### Q28. How would you structure a large-scale Playwright test framework? Describe the folder structure.
**Expected Answer:**
```
tests/
├── e2e/              # End-to-end tests
├── api/              # API tests
├── visual/           # Visual regression
pages/                # Page objects
├── LoginPage.ts
├── DashboardPage.ts
fixtures/             # Test fixtures
├── auth.ts
├── database.ts
helpers/              # Utilities
├── data-generator.ts
├── api-client.ts
config/               # Configurations
├── test-data.json
├── environments.ts
reports/              # Test reports
playwright.config.ts
```

### Q29. Explain the Builder Pattern and how you'd use it for test data creation.
**Expected Answer:**
```typescript
class UserBuilder {
  private user: Partial<User> = {};
  
  withUsername(username: string) {
    this.user.username = username;
    return this;
  }
  
  withRole(role: 'admin' | 'user') {
    this.user.role = role;
    return this;
  }
  
  build(): User {
    return this.user as User;
  }
}

const admin = new UserBuilder()
  .withUsername('admin')
  .withRole('admin')
  .build();
```

### Q30. What is the Factory Pattern and when would you use it in test automation?
**Expected Answer:**
```typescript
class PageFactory {
  static getPage(pageName: string, page: Page) {
    switch(pageName) {
      case 'login': return new LoginPage(page);
      case 'dashboard': return new DashboardPage(page);
      default: throw new Error('Unknown page');
    }
  }
}
```
- Create objects without specifying exact class
- Centralized page creation
- Easy to extend

### Q31. How do you implement custom fixtures in Playwright?
**Expected Answer:**
```typescript
import { test as base } from '@playwright/test';

type MyFixtures = {
  authenticatedPage: Page;
  testUser: User;
};

export const test = base.extend<MyFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password');
    await page.click('#submit');
    await use(page);
  },
  
  testUser: async ({}, use) => {
    const user = { username: 'test', password: 'pass' };
    await use(user);
  }
});
```

### Q32. Explain the concept of test tags/annotations in Playwright. How would you use them?
**Expected Answer:**
```typescript
test('login @smoke @auth', async ({ page }) => {
  // test
});

test('upload @regression @slow', async ({ page }) => {
  // test
});

// Run: npx playwright test --grep @smoke
// Skip: npx playwright test --grep-invert @slow
```
- Organize tests by feature, speed, priority
- Selective execution in CI/CD
- Filter smoke, regression, integration

### Q33. How do you handle test data management in a large project?
**Expected Answer:**
- **Separate files**: JSON/YAML for test data
- **Environment-specific**: dev/staging/prod data
- **Data builders**: Factory/Builder patterns
- **API generation**: Create via API before test
- **Database seeding**: Reset DB state
- **Fixtures**: Playwright fixtures for data
- **Secrets management**: env variables, vault

### Q34. What is the Repository Pattern and how does it apply to test automation?
**Expected Answer:**
```typescript
class UserRepository {
  async createUser(user: User): Promise<User> {
    // API call to create user
  }
  
  async getUser(id: string): Promise<User> {
    // API call to get user
  }
  
  async deleteUser(id: string): Promise<void> {
    // API call to delete user
  }
}
```
- Abstracts data access layer
- Single place for API/DB operations
- Easy to mock in tests

### Q35. How would you implement parallel test execution with shared state?
**Expected Answer:**
- **Avoid shared state** if possible
- Use **workers**: Each gets own context
- **Database**: Per-worker schemas
- **Test isolation**: Each test creates own data
- **Locks**: For unavoidable shared resources
```typescript
fullyParallel: true,
workers: process.env.CI ? 2 : undefined
```

---

## 4️⃣ Authentication & Security (Questions 36-40)

### Q36. How do you test Basic Authentication in Playwright?
**Expected Answer:**
```typescript
// Method 1: In URL
await page.goto('https://user:pass@example.com');

// Method 2: Context credentials
const context = await browser.newContext({
  httpCredentials: {
    username: 'user',
    password: 'pass'
  }
});

// Method 3: Set header
await page.setExtraHTTPHeaders({
  'Authorization': 'Basic ' + Buffer.from('user:pass').toString('base64')
});
```

### Q37. Explain how you would test OAuth 2.0 authentication flow.
**Expected Answer:**
1. **Intercept redirect**: Capture authorization code
2. **Mock provider**: Return fake token
3. **State storage**: Save token, reuse
4. **API approach**: Get token via API, inject
```typescript
// Save OAuth state after login
await context.storageState({ path: 'oauth-state.json' });

// Reuse in other tests
const context = await browser.newContext({ 
  storageState: 'oauth-state.json' 
});
```

### Q38. How do you handle 2FA (Two-Factor Authentication) in automated tests?
**Expected Answer:**
- **Test accounts**: Disable 2FA for test users
- **Backup codes**: Use one-time backup codes
- **TOTP**: Generate codes programmatically
- **API bypass**: Get session via API
- **Mock**: Mock authentication service
```typescript
import * as OTPAuth from 'otpauth';

const totp = new OTPAuth.TOTP({
  secret: 'BASE32SECRET'
});
const token = totp.generate();
await page.fill('#totp', token);
```

### Q39. How would you test session timeout and refresh token logic?
**Expected Answer:**
```typescript
// Mock server time or manipulate cookies
await page.evaluate(() => {
  document.cookie = 'session=expired; max-age=0';
});

// Wait for auto-refresh
await page.waitForResponse(resp => 
  resp.url().includes('/refresh-token')
);

// Or manipulate Date
await page.addInitScript(() => {
  Date.now = () => Date.now() + 3600000; // +1 hour
});
```

### Q40. How do you securely handle credentials in automated tests?
**Expected Answer:**
- **Environment variables**: `process.env.PASSWORD`
- **Secret managers**: AWS Secrets Manager, Azure Key Vault
- **Encrypted files**: Decrypt at runtime
- **.env files**: Gitignored, per environment
- **CI/CD secrets**: GitHub Secrets, GitLab Variables
```typescript
const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;

// Never commit:
// ❌ const password = 'hardcoded123';
```

---

## 5️⃣ Form Interactions & Dynamic Content (Questions 41-50)

### Q41. How do you handle file uploads in Playwright?
**Expected Answer:**
```typescript
// Single file
await page.setInputFiles('#upload', 'path/to/file.pdf');

// Multiple files
await page.setInputFiles('#upload', [
  'file1.pdf',
  'file2.pdf'
]);

// Create file on the fly
await page.setInputFiles('#upload', {
  name: 'test.txt',
  mimeType: 'text/plain',
  buffer: Buffer.from('content')
});

// Remove files
await page.setInputFiles('#upload', []);
```

### Q42. Explain different strategies for handling dynamic dropdowns that load via AJAX.
**Expected Answer:**
```typescript
// Wait for options to appear
await page.locator('select#country').click();
await page.waitForSelector('select#country option[value="US"]');

// Or wait for specific option
await page.selectOption('select#country', 'US');

// For custom dropdowns (not <select>)
await page.click('.dropdown-trigger');
await page.waitForSelector('.dropdown-menu');
await page.click('text="United States"');
```

### Q43. How do you test checkboxes and radio buttons with different states?
**Expected Answer:**
```typescript
const checkbox = page.locator('#agree');

// Check
await checkbox.check();
await expect(checkbox).toBeChecked();

// Uncheck
await checkbox.uncheck();
await expect(checkbox).not.toBeChecked();

// Radio button
await page.check('input[name="gender"][value="male"]');
await expect(page.locator('input[value="male"]')).toBeChecked();

// Verify disabled
await expect(page.locator('#disabled-checkbox')).toBeDisabled();
```

### Q44. How would you handle dynamic content that changes on each page load?
**Expected Answer:**
```typescript
// Approach 1: Assert on structure, not content
await expect(page.locator('.dynamic-content')).toHaveCount(3);

// Approach 2: Assert on pattern
const text = await page.locator('.content').textContent();
expect(text).toMatch(/[A-Za-z0-9\s]+/);

// Approach 3: Use data attributes
await expect(page.locator('[data-testid="content"]')).toBeVisible();

// Approach 4: Mock the API response
await page.route('**/api/content', route => {
  route.fulfill({ json: { content: 'Fixed content' } });
});
```

### Q45. Explain how to handle infinite scroll or lazy loading.
**Expected Answer:**
```typescript
// Method 1: Scroll and wait
let previousHeight = 0;
let currentHeight = await page.evaluate(() => document.body.scrollHeight);

while (previousHeight !== currentHeight) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  previousHeight = currentHeight;
  currentHeight = await page.evaluate(() => document.body.scrollHeight);
}

// Method 2: Wait for specific element
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForSelector('.item:nth-child(50)');

// Method 3: Network idle
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForLoadState('networkidle');
```

### Q46. How do you test autocomplete/typeahead fields?
**Expected Answer:**
```typescript
// Type and wait for suggestions
await page.fill('#search', 'Play');
await page.waitForSelector('.suggestions');

// Select from dropdown
await page.click('text="Playwright"');

// Or use keyboard
await page.fill('#search', 'Play');
await page.keyboard.press('ArrowDown');
await page.keyboard.press('Enter');

// Verify selection
await expect(page.locator('#search')).toHaveValue('Playwright');
```

### Q47. How would you test a multi-step form with validation?
**Expected Answer:**
```typescript
test('Multi-step form', async ({ page }) => {
  // Step 1
  await page.fill('#firstName', 'John');
  await page.fill('#lastName', 'Doe');
  await page.click('button:has-text("Next")');
  
  // Verify step 2 visible
  await expect(page.locator('.step-2')).toBeVisible();
  
  // Step 2
  await page.fill('#email', 'john@example.com');
  await page.click('button:has-text("Next")');
  
  // Step 3 - Validation error
  await page.click('button:has-text("Submit")');
  await expect(page.locator('.error')).toContainText('Required');
  
  // Fix and submit
  await page.check('#terms');
  await page.click('button:has-text("Submit")');
  
  await expect(page.locator('.success')).toBeVisible();
});
```

### Q48. How do you handle elements that appear/disappear based on conditions?
**Expected Answer:**
```typescript
// Wait for element to appear
await page.waitForSelector('.success-message', { state: 'visible' });

// Wait for element to disappear
await page.waitForSelector('.loading', { state: 'hidden' });

// Check if element eventually disappears
await expect(page.locator('.loading')).toBeHidden();

// Handle conditional elements
const errorMessage = page.locator('.error');
if (await errorMessage.isVisible()) {
  console.log(await errorMessage.textContent());
}
```

### Q49. How would you test date pickers and calendar widgets?
**Expected Answer:**
```typescript
// Method 1: Direct input if possible
await page.fill('#date', '2024-12-31');

// Method 2: Native picker
await page.locator('#date').fill('2024-12-31');

// Method 3: Custom calendar widget
await page.click('#date-picker');
await page.waitForSelector('.calendar');

// Navigate to month
while (await page.locator('.month-year').textContent() !== 'December 2024') {
  await page.click('.next-month');
}

// Click day
await page.click('td:has-text("31")');

// Method 4: JavaScript
await page.evaluate(() => {
  document.querySelector('#date').value = '2024-12-31';
});
```

### Q50. How do you test real-time form validation (validate as you type)?
**Expected Answer:**
```typescript
test('Real-time email validation', async ({ page }) => {
  const emailInput = page.locator('#email');
  const errorMessage = page.locator('.email-error');
  
  // Type invalid email
  await emailInput.fill('invalid');
  await expect(errorMessage).toContainText('Invalid email');
  
  // Continue typing
  await emailInput.fill('invalid@');
  await expect(errorMessage).toContainText('Invalid email');
  
  // Complete valid email
  await emailInput.fill('valid@example.com');
  await expect(errorMessage).toBeHidden();
  
  // Or check validation class
  await expect(emailInput).toHaveClass(/valid/);
});
```

---

## 6️⃣ Advanced Interactions (Questions 51-60)

### Q51. How do you implement drag and drop in Playwright?
**Expected Answer:**
```typescript
// Method 1: Using dragTo
await page.locator('#source').dragTo(page.locator('#target'));

// Method 2: Manual mouse events
const source = page.locator('#source');
const target = page.locator('#target');

await source.hover();
await page.mouse.down();
await target.hover();
await page.mouse.up();

// Method 3: HTML5 drag and drop
await page.locator('#source').dispatchEvent('dragstart');
await page.locator('#target').dispatchEvent('drop');
```

### Q52. How would you test hover effects and tooltips?
**Expected Answer:**
```typescript
// Hover and verify tooltip
await page.locator('.icon').hover();
await expect(page.locator('.tooltip')).toBeVisible();
await expect(page.locator('.tooltip')).toContainText('Help text');

// Verify CSS changes
await page.locator('.button').hover();
await expect(page.locator('.button')).toHaveCSS('background-color', 'rgb(0, 0, 255)');

// Multiple hover states
await page.locator('.menu').hover();
await page.locator('.submenu-trigger').hover();
await expect(page.locator('.submenu')).toBeVisible();
```

### Q53. Explain how to handle right-click (context menu) interactions.
**Expected Answer:**
```typescript
// Right click
await page.locator('#element').click({ button: 'right' });

// Verify context menu appears
await expect(page.locator('.context-menu')).toBeVisible();

// Click menu item
await page.click('text="Copy"');

// Handle browser context menu
page.on('dialog', async dialog => {
  expect(dialog.message()).toBe('Context menu action');
  await dialog.accept();
});

await page.locator('#element').click({ button: 'right' });
```

### Q54. How do you test keyboard shortcuts and hotkeys?
**Expected Answer:**
```typescript
// Single key
await page.keyboard.press('Enter');

// Key combination
await page.keyboard.press('Control+C');
await page.keyboard.press('Meta+V'); // Command on Mac

// Multiple keys
await page.keyboard.down('Shift');
await page.keyboard.press('A');
await page.keyboard.up('Shift');

// Test focus behavior
await page.locator('#input1').focus();
await page.keyboard.press('Tab');
await expect(page.locator('#input2')).toBeFocused();

// Test shortcut triggers action
await page.keyboard.press('Control+S');
await expect(page.locator('.saved-message')).toBeVisible();
```

### Q55. How would you test responsive design and mobile viewports?
**Expected Answer:**
```typescript
// Set viewport
await page.setViewportSize({ width: 375, height: 667 }); // iPhone

// Use device descriptor
const iPhone = devices['iPhone 12'];
const context = await browser.newContext({
  ...iPhone
});

// Test different breakpoints
test.describe('Responsive tests', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // Mobile
  
  test('Mobile menu', async ({ page }) => {
    await expect(page.locator('.hamburger-menu')).toBeVisible();
  });
});

// Desktop
test.describe('Desktop tests', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });
  
  test('Desktop nav', async ({ page }) => {
    await expect(page.locator('.desktop-nav')).toBeVisible();
  });
});
```

### Q56. How do you test scrolling behavior and sticky elements?
**Expected Answer:**
```typescript
// Scroll to element
await page.locator('#bottom-element').scrollIntoViewIfNeeded();

// Scroll to position
await page.evaluate(() => window.scrollTo(0, 1000));

// Test sticky header
await page.evaluate(() => window.scrollTo(0, 500));
const header = page.locator('.sticky-header');
await expect(header).toHaveCSS('position', 'fixed');

// Verify element in viewport
const isInViewport = await page.locator('#element').evaluate(el => {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
});
expect(isInViewport).toBeTruthy();
```

### Q57. How would you test modal dialogs and overlays?
**Expected Answer:**
```typescript
// Open modal
await page.click('button:has-text("Open Modal")');

// Verify modal visible
const modal = page.locator('.modal');
await expect(modal).toBeVisible();

// Verify backdrop prevents interaction
const backdrop = page.locator('.modal-backdrop');
await expect(backdrop).toBeVisible();

// Try to click behind modal (should not work)
await backdrop.click({ position: { x: 10, y: 10 } });

// Close modal - X button
await page.click('.modal .close-button');
await expect(modal).toBeHidden();

// Or ESC key
await page.keyboard.press('Escape');
await expect(modal).toBeHidden();

// Or click backdrop
await backdrop.click();
await expect(modal).toBeHidden();
```

### Q58. How do you handle Shadow DOM in Playwright?
**Expected Answer:**
```typescript
// Playwright handles Shadow DOM automatically
await page.locator('my-component').locator('button').click();

// Or explicit pierce
await page.locator('pierce=my-component button').click();

// Access via evaluate
const shadowText = await page.evaluate(() => {
  const element = document.querySelector('my-component');
  return element.shadowRoot.querySelector('button').textContent;
});

// Use piercing selector
const button = page.locator('pierce/.my-shadow-button');
await button.click();
```

### Q59. How would you test focus management and tab order?
**Expected Answer:**
```typescript
test('Tab order', async ({ page }) => {
  await page.goto('/form');
  
  // Focus first element
  await page.keyboard.press('Tab');
  await expect(page.locator('#firstName')).toBeFocused();
  
  // Tab to next
  await page.keyboard.press('Tab');
  await expect(page.locator('#lastName')).toBeFocused();
  
  // Shift+Tab to previous
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('#firstName')).toBeFocused();
  
  // Skip disabled elements
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(page.locator('#email')).toBeFocused();
  expect(await page.locator('#disabled-field').evaluate(el => 
    el === document.activeElement
  )).toBe(false);
});
```

### Q60. How do you test animations and transitions?
**Expected Answer:**
```typescript
// Wait for animation to complete
await page.waitForFunction(() => {
  const el = document.querySelector('.animated');
  return getComputedStyle(el).animationPlayState === 'paused';
});

// Disable animations for testing
await page.addInitScript(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = '* { animation-duration: 0s !important; transition: none !important; }';
    document.head.appendChild(style);
  });
});

// Test animation triggers
await page.click('.trigger');
const element = page.locator('.animated');
await expect(element).toHaveClass(/fade-in/);

// Wait for specific duration
await page.waitForTimeout(500); // Animation duration
await expect(element).toHaveCSS('opacity', '1');
```

---

## 7️⃣ iFrames, Windows & Navigation (Questions 61-65)

### Q61. How do you handle iFrames in Playwright?
**Expected Answer:**
```typescript
// Method 1: frameLocator (recommended)
const iframe = page.frameLocator('#iframe-id');
await iframe.locator('button').click();

// Method 2: frame()
const frame = page.frame({ name: 'iframe-name' });
await frame.locator('button').click();

// Nested iframes
const outerFrame = page.frameLocator('#outer-iframe');
const innerFrame = outerFrame.frameLocator('#inner-iframe');
await innerFrame.locator('input').fill('text');

// Wait for iframe to load
await page.frameLocator('#iframe').locator('body').waitFor();
```

### Q62. How would you test multiple browser tabs/windows?
**Expected Answer:**
```typescript
// Listen for new page
const pagePromise = context.waitForEvent('page');

// Trigger new tab
await page.click('a[target="_blank"]');

// Get new page
const newPage = await pagePromise;
await newPage.waitForLoadState();

// Work with new page
await expect(newPage).toHaveURL(/new-page/);
await newPage.click('button');

// Switch back
await page.bringToFront();

// Get all pages
const pages = context.pages();
expect(pages).toHaveLength(2);

// Close new page
await newPage.close();
```

### Q63. How do you handle browser navigation (back, forward, refresh)?
**Expected Answer:**
```typescript
// Navigate
await page.goto('/page1');
await page.goto('/page2');

// Go back
await page.goBack();
await expect(page).toHaveURL(/page1/);

// Go forward
await page.goForward();
await expect(page).toHaveURL(/page2/);

// Reload
await page.reload();

// Wait for navigation
await Promise.all([
  page.waitForNavigation(),
  page.click('a')
]);

// Check if navigation occurred
const url = page.url();
expect(url).toContain('/expected');
```

### Q64. How would you test browser history and URL parameters?
**Expected Answer:**
```typescript
// Navigate with query params
await page.goto('/search?q=playwright&sort=relevance');

// Verify URL params
const url = new URL(page.url());
expect(url.searchParams.get('q')).toBe('playwright');
expect(url.searchParams.get('sort')).toBe('relevance');

// Modify URL params
await page.evaluate(() => {
  const url = new URL(window.location.href);
  url.searchParams.set('page', '2');
  window.history.pushState({}, '', url);
});

// Verify history length
const historyLength = await page.evaluate(() => window.history.length);
expect(historyLength).toBeGreaterThan(1);
```

### Q65. How do you handle popups and dialogs (alert, confirm, prompt)?
**Expected Answer:**
```typescript
// Alert
page.on('dialog', async dialog => {
  expect(dialog.type()).toBe('alert');
  expect(dialog.message()).toBe('Alert message');
  await dialog.accept();
});
await page.click('#alert-button');

// Confirm - Accept
page.once('dialog', dialog => dialog.accept());
await page.click('#confirm-button');

// Confirm - Dismiss
page.once('dialog', dialog => dialog.dismiss());
await page.click('#confirm-button');

// Prompt - Enter text
page.once('dialog', dialog => dialog.accept('My input'));
await page.click('#prompt-button');

// Auto-handle all dialogs
page.on('dialog', dialog => dialog.accept());
```

---

## 8️⃣ API Testing & Network (Questions 66-70)

### Q66. How do you perform API testing with Playwright?
**Expected Answer:**
```typescript
import { request } from '@playwright/test';

test('API test', async () => {
  const context = await request.newContext({
    baseURL: 'https://api.example.com'
  });
  
  const response = await context.get('/users/1');
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  expect(data.name).toBe('John Doe');
  
  // POST request
  const createResponse = await context.post('/users', {
    data: { name: 'Jane', email: 'jane@example.com' }
  });
  expect(createResponse.status()).toBe(201);
});
```

### Q67. How do you mock API responses in Playwright?
**Expected Answer:**
```typescript
// Mock specific endpoint
await page.route('**/api/users', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([
      { id: 1, name: 'Mocked User' }
    ])
  });
});

// Mock based on request
await page.route('**/api/**', route => {
  if (route.request().method() === 'POST') {
    route.fulfill({ status: 201, body: 'Created' });
  } else {
    route.continue();
  }
});

// Abort requests (block images)
await page.route('**/*.{png,jpg,jpeg}', route => route.abort());

// Modify response
await page.route('**/api/data', async route => {
  const response = await route.fetch();
  const json = await response.json();
  json.modified = true;
  route.fulfill({ response, json });
});
```

### Q68. How would you test WebSocket connections?
**Expected Answer:**
```typescript
// Listen for WebSocket
page.on('websocket', ws => {
  console.log(`WebSocket opened: ${ws.url()}`);
  
  ws.on('framesent', frame => console.log('Sent:', frame.payload));
  ws.on('framereceived', frame => console.log('Received:', frame.payload));
  ws.on('close', () => console.log('WebSocket closed'));
});

// Trigger WebSocket connection
await page.click('#connect');

// Wait for specific message
await page.waitForEvent('websocket', ws => {
  return new Promise(resolve => {
    ws.on('framereceived', frame => {
      if (frame.payload.includes('connected')) {
        resolve(true);
      }
    });
  });
});
```

### Q69. How do you intercept and verify network requests?
**Expected Answer:**
```typescript
// Listen to all requests
page.on('request', request => {
  console.log('Request:', request.url());
});

// Listen to responses
page.on('response', response => {
  console.log('Response:', response.status(), response.url());
});

// Wait for specific request
const request = await page.waitForRequest('**/api/users');
expect(request.method()).toBe('GET');

// Wait for specific response
const response = await page.waitForResponse('**/api/users');
expect(response.status()).toBe(200);
const data = await response.json();
expect(data).toHaveLength(10);

// Verify request body
page.on('request', request => {
  if (request.url().includes('/api/login')) {
    const postData = request.postDataJSON();
    expect(postData.username).toBe('testuser');
  }
});
```

### Q70. How would you test different network conditions (slow, offline)?
**Expected Answer:**
```typescript
// Slow 3G
const context = await browser.newContext({
  offline: false,
  downloadThroughput: 50 * 1024,
  uploadThroughput: 50 * 1024,
  latency: 2000
});

// Offline
await context.setOffline(true);
await page.reload();
await expect(page.locator('.offline-message')).toBeVisible();

// Back online
await context.setOffline(false);

// Failed requests
await page.route('**/api/data', route => route.abort('failed'));
await page.click('#load-data');
await expect(page.locator('.error')).toContainText('Failed to load');
```

---

## 9️⃣ Performance & Debugging (Questions 71-75)

### Q71. How do you measure page load performance with Playwright?
**Expected Answer:**
```typescript
const startTime = Date.now();
await page.goto('https://example.com');
const loadTime = Date.now() - startTime;
console.log(`Page loaded in ${loadTime}ms`);

// Web Vitals
const metrics = await page.evaluate(() => ({
  fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
  lcp: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime,
  cls: performance.getEntriesByType('layout-shift').reduce((sum, entry) => sum + entry.value, 0)
}));

console.log('FCP:', metrics.fcp);
console.log('LCP:', metrics.lcp);
console.log('CLS:', metrics.cls);

// Performance timeline
const performanceTiming = await page.evaluate(() => JSON.stringify(window.performance.timing));
```

### Q72. How would you debug a flaky test that passes locally but fails in CI?
**Expected Answer:**
**Investigation steps:**
1. Check CI logs and screenshots
2. Review timing differences (CI often slower)
3. Check environment differences (viewport, timezone, locale)
4. Enable trace: `--trace on`
5. Add more explicit waits
6. Check for race conditions

**Solutions:**
```typescript
// Increase timeout
test.setTimeout(60000);

// Add retry
test.describe.configure({ retries: 2 });

// Better waits
await page.waitForLoadState('networkidle');
await expect(locator).toBeVisible({ timeout: 10000 });

// CI-specific config
if (process.env.CI) {
  test.setTimeout(90000);
  workers: 1
}
```

### Q73. How do you use Playwright's trace viewer for debugging?
**Expected Answer:**
```bash
# Record trace
npx playwright test --trace on

# View trace
npx playwright show-trace trace.zip
```

**Trace includes:**
- Screenshots at each action
- DOM snapshots
- Network activity
- Console logs
- Source code
- Call stack

```typescript
// Programmatic trace
await context.tracing.start({ screenshots: true, snapshots: true });
// ... run tests
await context.tracing.stop({ path: 'trace.zip' });
```

### Q74. How would you implement visual regression testing with Playwright?
**Expected Answer:**
```typescript
test('Visual regression', async ({ page }) => {
  await page.goto('/');
  
  // Full page screenshot
  await expect(page).toHaveScreenshot('homepage.png');
  
  // Element screenshot
  await expect(page.locator('.header')).toHaveScreenshot('header.png');
  
  // With threshold for minor differences
  await expect(page).toHaveScreenshot('page.png', {
    maxDiffPixels: 100
  });
  
  // Mask dynamic content
  await expect(page).toHaveScreenshot({
    mask: [page.locator('.timestamp')]
  });
});

// Update baselines: npx playwright test --update-snapshots
```

### Q75. How do you optimize test execution time?
**Expected Answer:**
**Strategies:**
1. **Parallel execution**: `fullyParallel: true`
2. **Shared authentication**: Use storageState
3. **Mock slow APIs**: Use route mocking
4. **Skip unnecessary waits**: Remove `waitForTimeout`
5. **Optimize locators**: Use testId over XPath
6. **Database seeding**: Pre-populate data
7. **Smart test selection**: Run only affected tests
8. **Workers**: Increase worker count

```typescript
// playwright.config.ts
export default {
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  use: {
    trace: 'retain-on-failure', // Not always
  },
  projects: [
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'auth.json' },
      dependencies: ['setup'],
    },
  ],
};
```

---

## 🔟 CI/CD & DevOps (Questions 76-80)

### Q76. How do you integrate Playwright tests into a CI/CD pipeline?
**Expected Answer:**
```yaml
# GitHub Actions
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      
      - name: Run tests
        run: npx playwright test
        env:
          TEST_USERNAME: ${{ secrets.TEST_USERNAME }}
          TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}
      
      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### Q77. How would you implement test reporting in CI/CD?
**Expected Answer:**
```typescript
// playwright.config.ts
reporter: [
  ['html'],
  ['junit', { outputFile: 'results.xml' }],
  ['json', { outputFile: 'results.json' }],
  ['github'], // For GitHub Actions
  ['list'], // For console
],

// Custom reporter
class MyReporter {
  onTestEnd(test, result) {
    // Send to Slack, email, database, etc.
  }
}
```

**CI Integration:**
- Publish HTML reports to GitHub Pages
- Send Slack notifications on failure
- Track metrics in DataDog/Grafana
- Store results in database
- Generate trend reports

### Q78. How do you manage test environments (dev, staging, prod)?
**Expected Answer:**
```typescript
// environments.ts
export const environments = {
  dev: {
    baseURL: 'https://dev.example.com',
    apiURL: 'https://api-dev.example.com'
  },
  staging: {
    baseURL: 'https://staging.example.com',
    apiURL: 'https://api-staging.example.com'
  },
  prod: {
    baseURL: 'https://example.com',
    apiURL: 'https://api.example.com'
  }
};

// playwright.config.ts
const env = process.env.ENV || 'dev';
use: {
  baseURL: environments[env].baseURL,
}

// Run: ENV=staging npx playwright test
```

### Q79. How would you implement parallel testing across multiple machines?
**Expected Answer:**
```bash
# Shard tests across machines
# Machine 1
npx playwright test --shard=1/3

# Machine 2
npx playwright test --shard=2/3

# Machine 3
npx playwright test --shard=3/3

# GitHub Actions
strategy:
  matrix:
    shardIndex: [1, 2, 3, 4]
    shardTotal: [4]

run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}

# Merge reports
npx playwright merge-reports --reporter html
```

### Q80. How do you handle test data in CI/CD environments?
**Expected Answer:**
**Strategies:**
1. **Test database**: Separate DB for tests, reset before run
2. **API creation**: Create data via API before tests
3. **Database seeding**: SQL scripts to populate data
4. **Fixtures**: Generate data in fixtures
5. **Mocking**: Mock external dependencies

```typescript
// Global setup
export default async function globalSetup() {
  // Seed database
  await seedDatabase();
  
  // Create test users via API
  const context = await request.newContext();
  await context.post('/api/users', { data: testUsers });
}

// Global teardown
export default async function globalTeardown() {
  await cleanupDatabase();
}
```

---

## 1️⃣1️⃣ Framework Design & Best Practices (Questions 81-90)

### Q81. What are the SOLID principles and how do they apply to test automation frameworks?
**Expected Answer:**
**S - Single Responsibility**: Each page class handles one page
**O - Open/Closed**: Extend fixtures, don't modify
**L - Liskov Substitution**: Interfaces for pages
**I - Interface Segregation**: Small, specific interfaces
**D - Dependency Injection**: Use fixtures

```typescript
// Good: Single Responsibility
class LoginPage {
  async login(user) { /* only login logic */ }
}

// Good: Dependency Injection
test('login', async ({ page, testUser }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(testUser);
});
```

### Q82. How would you implement a keyword-driven or data-driven framework in Playwright?
**Expected Answer:**
```typescript
// Data-driven
const testCases = [
  { username: 'user1', password: 'pass1', expected: 'Dashboard' },
  { username: 'user2', password: 'pass2', expected: 'Admin' },
];

testCases.forEach(({ username, password, expected }) => {
  test(`Login as ${username}`, async ({ page }) => {
    await login(page, username, password);
    await expect(page.locator('h1')).toContainText(expected);
  });
});

// Keyword-driven
const keywords = {
  'navigate': (page, url) => page.goto(url),
  'click': (page, selector) => page.click(selector),
  'fill': (page, selector, text) => page.fill(selector, text),
  'verify': (page, selector, text) => expect(page.locator(selector)).toContainText(text),
};

const testSteps = [
  { keyword: 'navigate', args: ['/login'] },
  { keyword: 'fill', args: ['#username', 'user'] },
  { keyword: 'fill', args: ['#password', 'pass'] },
  { keyword: 'click', args: ['#submit'] },
  { keyword: 'verify', args: ['h1', 'Dashboard'] },
];

for (const step of testSteps) {
  await keywords[step.keyword](page, ...step.args);
}
```

### Q83. How do you implement custom assertions/matchers in Playwright?
**Expected Answer:**
```typescript
import { expect } from '@playwright/test';

expect.extend({
  async toHaveValidationError(locator: Locator, expected: string) {
    const errorElement = locator.locator('~ .error');
    const errorText = await errorElement.textContent();
    
    const pass = errorText?.includes(expected);
    
    return {
      pass,
      message: () => pass
        ? `Expected not to have error "${expected}"`
        : `Expected error "${expected}", got "${errorText}"`
    };
  }
});

// Usage
await expect(page.locator('#email')).toHaveValidationError('Invalid email');
```

### Q84. How would you implement test retry logic with custom conditions?
**Expected Answer:**
```typescript
// playwright.config.ts
retries: process.env.CI ? 2 : 0,

// Conditional retry based on error
test('flaky test', async ({ page }, testInfo) => {
  try {
    await page.click('#button');
  } catch (error) {
    if (error.message.includes('Timeout') && testInfo.retry < 2) {
      console.log('Retrying due to timeout...');
      throw error; // Retry
    }
    throw error; // Don't retry
  }
});

// Custom retry decorator
function retryOnCondition(condition: (error) => boolean, maxRetries = 3) {
  return function (target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args) {
      let lastError;
      for (let i = 0; i < maxRetries; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error;
          if (!condition(error)) throw error;
          console.log(`Retry ${i + 1}/${maxRetries}`);
        }
      }
      throw lastError;
    };
  };
}
```

### Q85. How do you implement logging and monitoring in test automation?
**Expected Answer:**
```typescript
// Custom logger
class TestLogger {
  log(level: string, message: string, meta?: any) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] ${message}`, meta || '');
    
    // Send to external service
    if (process.env.CI) {
      this.sendToDatadog({ level, message, meta, timestamp });
    }
  }
  
  info(message: string, meta?: any) { this.log('INFO', message, meta); }
  error(message: string, meta?: any) { this.log('ERROR', message, meta); }
}

// Usage in tests
const logger = new TestLogger();

test('test with logging', async ({ page }) => {
  logger.info('Starting test');
  
  try {
    await page.goto('/');
    logger.info('Page loaded');
  } catch (error) {
    logger.error('Page load failed', { error: error.message });
    throw error;
  }
});

// Monitor test metrics
class TestMetrics {
  static track(testName: string, duration: number, status: string) {
    // Send to Grafana, DataDog, CloudWatch, etc.
  }
}
```

### Q86. How would you implement a test execution dashboard?
**Expected Answer:**
**Components:**
1. **Data collection**: Store test results in database
2. **API**: Expose results via REST API
3. **Frontend**: Display metrics, trends, history
4. **Notifications**: Slack/email on failures

```typescript
// Store results
class ResultsRepository {
  async saveResult(result: TestResult) {
    await db.insert('test_results', {
      testName: result.title,
      status: result.status,
      duration: result.duration,
      timestamp: new Date(),
      environment: process.env.ENV,
      browser: result.project
    });
  }
}

// Custom reporter
class DashboardReporter {
  async onTestEnd(test, result) {
    await resultsRepo.saveResult(result);
    
    if (result.status === 'failed') {
      await this.sendSlackNotification(test, result);
    }
  }
}

// Dashboard shows:
// - Pass/fail rate over time
// - Flaky tests (pass/fail ratio)
// - Slowest tests
// - Test coverage
// - Failure trends by browser/environment
```

### Q87. How do you handle test dependencies and test order?
**Expected Answer:**
```typescript
// Dependencies using Playwright projects
export default {
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'logged-in-tests',
      dependencies: ['setup'],
      use: { storageState: 'state.json' },
    },
  ],
};

// Explicit test ordering (avoid if possible)
test.describe.serial('Ordered tests', () => {
  test('Step 1: Create account', async ({ page }) => {
    // ...
  });
  
  test('Step 2: Verify email', async ({ page }) => {
    // Depends on step 1
  });
  
  test('Step 3: Complete profile', async ({ page }) => {
    // Depends on step 2
  });
});

// Better: Make tests independent
test('Complete signup flow', async ({ page }) => {
  // All steps in one test
  await createAccount(page);
  await verifyEmail(page);
  await completeProfile(page);
});
```

### Q88. How would you implement accessibility testing in your framework?
**Expected Answer:**
```typescript
import { injectAxe, checkA11y } from 'axe-playwright';

test('Accessibility', async ({ page }) => {
  await page.goto('/');
  
  // Inject axe-core
  await injectAxe(page);
  
  // Run accessibility checks
  const results = await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: {
      html: true
    }
  });
  
  expect(results.violations).toHaveLength(0);
});

// Check specific elements
await checkA11y(page, '.form-container', {
  rules: {
    'color-contrast': { enabled: true },
    'label': { enabled: true }
  }
});

// Custom accessibility checks
test('Keyboard navigation', async ({ page }) => {
  await page.goto('/');
  
  // Tab through form
  await page.keyboard.press('Tab');
  await expect(page.locator('#firstName')).toBeFocused();
  
  await page.keyboard.press('Tab');
  await expect(page.locator('#lastName')).toBeFocused();
  
  // Skip links
  const skipLink = page.locator('a:has-text("Skip to main content")');
  await skipLink.focus();
  await skipLink.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});
```

### Q89. How do you implement cross-browser and cross-platform testing?
**Expected Answer:**
```typescript
// playwright.config.ts
projects: [
  {
    name: 'Desktop Chrome',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'Desktop Firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'Desktop Safari',
    use: { ...devices['Desktop Safari'] },
  },
  {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] },
  },
  {
    name: 'Mobile Safari',
    use: { ...devices['iPhone 12'] },
  },
],

// Conditional tests
test('Feature only on Chromium', async ({ browserName, page }) => {
  test.skip(browserName !== 'chromium', 'Chromium only feature');
  // test logic
});

// Platform-specific
test('Windows only', async () => {
  test.skip(process.platform !== 'win32', 'Windows only');
  // test logic
});

// BrowserStack/Sauce Labs integration
const capabilities = {
  'browserstack.user': process.env.BROWSERSTACK_USER,
  'browserstack.key': process.env.BROWSERSTACK_KEY,
  browser: 'chrome',
  browser_version: 'latest',
  os: 'Windows',
  os_version: '10'
};
```

### Q90. How would you implement test parallelization with resource locking?
**Expected Answer:**
```typescript
// When tests need shared resource (e.g., one test user)
class ResourceLock {
  private locks = new Map<string, boolean>();
  
  async acquire(resource: string): Promise<void> {
    while (this.locks.get(resource)) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.locks.set(resource, true);
  }
  
  release(resource: string): void {
    this.locks.delete(resource);
  }
}

const lock = new ResourceLock();

test('Test with shared resource', async ({ page }) => {
  await lock.acquire('test-user-1');
  
  try {
    // Use test-user-1
    await login(page, 'test-user-1', 'password');
    // ... test logic
  } finally {
    await lock.release('test-user-1');
  }
});

// Better approach: Create unique resources per test
test('Test with isolated resource', async ({ page }) => {
  const user = await createUniqueUser();
  await login(page, user.username, user.password);
  // ... test logic
  await deleteUser(user.id);
});
```

---

## 1️⃣2️⃣ Leadership & Strategy (Questions 91-100)

### Q91. How do you determine what to automate and what not to automate?
**Expected Answer:**
**Automate:**
- Regression tests (run frequently)
- Smoke tests (critical paths)
- Data-driven tests (many combinations)
- API tests (fast, reliable)
- Cross-browser tests

**Don't automate:**
- One-time exploratory tests
- Tests that change frequently
- Complex visual validation (use human eyes)
- Tests that are too flaky
- When ROI is negative (more maintenance than value)

**Decision matrix:**
- Frequency of execution
- Stability of feature
- Time to automate vs. manual
- Maintenance cost
- Business criticality

### Q92. How would you introduce test automation to a team with no automation experience?
**Expected Answer:**
**Approach:**
1. **Start small**: Automate critical happy path
2. **Quick wins**: Show value early
3. **Training**: Hands-on workshops
4. **Pair programming**: Learn by doing
5. **Documentation**: Clear guides and examples
6. **Code reviews**: Establish standards
7. **Success stories**: Share metrics
8. **Incremental adoption**: Don't force

**First 90 days:**
- Week 1-2: Setup framework, POC
- Week 3-4: Automate 5-10 critical tests
- Week 5-8: Train team, pair program
- Week 9-12: Team writes tests independently

### Q93. How do you measure the success and ROI of test automation?
**Expected Answer:**
**Metrics:**
1. **Test coverage**: % of features automated
2. **Execution time**: Time saved vs. manual
3. **Defect detection**: Bugs caught by automation
4. **Maintenance cost**: Time spent fixing tests
5. **Flakiness rate**: Unreliable tests
6. **Deployment frequency**: Faster releases
7. **Developer confidence**: Survey results

**ROI calculation:**
```
Time saved per regression cycle = 
  (Manual execution time - Automated time) × Cycles per year

Cost of automation = 
  Initial development + Annual maintenance

ROI = (Time saved × Hourly rate - Cost) / Cost × 100%
```

**Example:**
- Manual regression: 40 hours
- Automated: 2 hours
- Cycles: 20/year
- Saved: 760 hours/year
- At $100/hour: $76,000 saved
- Automation cost: $30,000
- ROI: 153%

### Q94. How do you handle resistance to test automation from developers or management?
**Expected Answer:**
**Resistance from developers:**
- Show how it helps them (catch bugs early)
- Involve them in tool selection
- Integrate into their workflow (CI/CD)
- Don't block their work
- Share ownership

**Resistance from management:**
- Show business value (faster releases, lower costs)
- Start with pilot project
- Provide metrics and ROI
- Quick wins to build trust
- Address concerns directly

**Common concerns:**
- "Too expensive" → Show ROI calculation
- "Takes too long" → Start small, show progress
- "Tests are flaky" → Invest in stability
- "Slows development" → Parallel execution, fast feedback

### Q95. How would you architect a multi-tenant testing solution where multiple teams share the same framework?
**Expected Answer:**
**Architecture:**
```
shared-framework/
├── core/                # Shared utilities
├── config/              # Base configuration
└── common-pages/        # Shared page objects

team-a-tests/
├── tests/
├── pages/               # Team-specific pages
└── playwright.config.ts # Extends base config

team-b-tests/
├── tests/
├── pages/
└── playwright.config.ts
```

**Key considerations:**
1. **Versioning**: Framework as npm package
2. **Isolation**: Separate test data per team
3. **Reporting**: Team-specific dashboards
4. **CI/CD**: Separate pipelines
5. **Governance**: Shared standards, team autonomy
6. **Support**: Central team for framework

### Q96. How do you balance test automation with manual testing?
**Expected Answer:**
**Automation:**
- Regression testing
- API testing
- Cross-browser testing
- Performance testing
- Smoke tests

**Manual:**
- Exploratory testing
- Usability testing
- Ad-hoc testing
- Visual design review
- New feature validation

**Optimal split:**
- 70% automated (stable features)
- 30% manual (exploratory, visual)

**Strategy:**
- Automate after feature stabilizes
- Manual for new features
- Continuous evaluation

### Q97. How would you implement a test automation strategy for microservices architecture?
**Expected Answer:**
**Testing pyramid for microservices:**
1. **Unit tests** (70%): Each service
2. **Integration tests** (20%): Service-to-service
3. **Contract tests** (5%): API contracts
4. **E2E tests** (5%): Critical user journeys

**Strategies:**
- **Service isolation**: Test each service independently
- **Contract testing**: Pact, Spring Cloud Contract
- **Test doubles**: Mock dependencies
- **Deployment**: Independent pipelines per service
- **API testing**: Heavy focus on API layer

```typescript
// Contract test example
test('User service fulfills contract', async ({ request }) => {
  const response = await request.get('/users/1');
  expect(response.status()).toBe(200);
  
  const user = await response.json();
  expect(user).toMatchSchema({
    id: expect.any(Number),
    name: expect.any(String),
    email: expect.stringMatching(/\S+@\S+\.\S+/)
  });
});
```

### Q98. How do you mentor junior automation engineers?
**Expected Answer:**
**Mentoring approach:**
1. **Pair programming**: Work together on tests
2. **Code reviews**: Teach best practices
3. **Set goals**: Progressive skill building
4. **Resources**: Courses, books, documentation
5. **Challenges**: Give real problems to solve
6. **Feedback**: Regular 1-on-1s
7. **Ownership**: Let them own features
8. **Mistakes**: Safe space to learn

**Learning path:**
- Month 1: Playwright basics, write simple tests
- Month 2: Page objects, fixtures
- Month 3: API testing, mocking
- Month 4: Advanced topics, framework design
- Month 5+: Lead feature automation

**Weekly:**
- Monday: Review goals
- Wednesday: Pair programming
- Friday: Code review + feedback

### Q99. How would you migrate from Selenium to Playwright?
**Expected Answer:**
**Migration strategy:**
1. **Run in parallel**: Both frameworks temporarily
2. **Start with new features**: Playwright for new tests
3. **Prioritize**: Migrate critical tests first
4. **Incremental**: Don't rewrite everything at once
5. **Training**: Team learns Playwright
6. **Decommission**: Phase out Selenium gradually

**Technical approach:**
```typescript
// Selenium → Playwright mapping
driver.findElement(By.id('btn'))        → page.locator('#btn')
driver.findElement(By.id('btn')).click() → page.click('#btn')
driver.get('http://url')                → page.goto('http://url')
new WebDriverWait(driver, 10)           → (automatic in Playwright)
```

**Timeline:** 3-6 months for medium project

**Risk mitigation:**
- Keep Selenium as backup initially
- Extensive testing before switching
- Rollback plan

### Q100. What are the future trends in test automation, and how do you prepare for them?
**Expected Answer:**
**Trends:**
1. **AI-powered testing**: Self-healing tests, smart locators
2. **Visual AI**: Automated visual validation
3. **Shift-left**: Testing earlier in development
4. **Test automation in production**: Synthetic monitoring
5. **Low-code/no-code**: Non-technical testers
6. **Cloud-based testing**: BrowserStack, Sauce Labs
7. **API-first testing**: More backend testing
8. **Performance engineering**: Performance from start

**Preparation:**
- **Continuous learning**: Follow blogs, conferences
- **Experiment**: Try new tools (Applitools, TestRigor)
- **Modernize framework**: Keep dependencies updated
- **Cloud migration**: Move tests to cloud
- **AI integration**: Explore AI testing tools
- **Skills**: Learn AI/ML basics
- **Network**: Join testing communities

**Investment areas:**
- AI/ML for test generation
- Visual regression tools
- Cloud infrastructure
- Performance testing tools
- API testing expansion

---

## 📊 Interview Question Summary

**By Category:**
- Playwright Fundamentals: 15 questions
- TypeScript & JavaScript: 10 questions
- Architecture & Design: 10 questions
- Authentication & Security: 5 questions
- Form Interactions: 10 questions
- Advanced Interactions: 10 questions
- iFrames & Windows: 5 questions
- API & Network: 5 questions
- Performance & Debugging: 5 questions
- CI/CD & DevOps: 5 questions
- Framework Design: 10 questions
- Leadership: 10 questions

**Difficulty:**
- Junior (Q1-30): Basic concepts, syntax, simple scenarios
- Mid (Q31-60): Complex scenarios, patterns, best practices
- Senior (Q61-80): Architecture, performance, CI/CD
- Lead (Q81-100): Strategy, mentoring, business decisions

**Preparation Tips:**
1. Hands-on practice with the provided test suite
2. Understand "why" not just "how"
3. Prepare real-world examples from experience
4. Know trade-offs and alternatives
5. Be ready to code during interview
6. Demonstrate problem-solving approach
7. Show leadership and decision-making
8. Discuss failures and learnings

---

**Good luck with your interviews!** 🎯
