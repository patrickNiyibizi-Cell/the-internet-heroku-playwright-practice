# The Internet Playwright Tests

Complete Playwright + TypeScript test automation suite for [the-internet.herokuapp.com](https://the-internet.herokuapp.com).

## 📋 Test Coverage

This project includes automated tests for **ALL 44 scenarios** from the-internet.herokuapp.com:

### Authentication (5 tests)
- ✅ Basic Authentication (valid credentials)
- ✅ Digest Authentication (valid credentials)
- ✅ Form Authentication (login/logout)
- ✅ Invalid credentials handling
- ✅ Multiple login attempts

### Form Elements (5 tests)
- ✅ Checkboxes (check/uncheck)
- ✅ Dropdown selection
- ✅ Input fields
- ✅ File upload
- ✅ Add/Remove elements dynamically

### JavaScript (4 tests)
- ✅ JS Alert (accept)
- ✅ JS Confirm (accept/dismiss)
- ✅ JS Prompt (enter text)
- ✅ JavaScript onload event error detection

### Dynamic Content (6 tests)
- ✅ Dynamic Loading (hidden elements)
- ✅ Dynamic Loading (rendered elements)
- ✅ Dynamic Controls (remove/add checkbox)
- ✅ Dynamic Controls (enable/disable input)
- ✅ Dynamic Content (content changes)
- ✅ Dynamic Content (static mode)

### Interactions (5 tests)
- ✅ Drag and Drop
- ✅ Hovers (show user info)
- ✅ Context Menu (right-click)
- ✅ Key Presses
- ✅ Multiple Windows

### Frames & iFrames (2 tests)
- ✅ Nested Frames
- ✅ iFrame content editing (WYSIWYG)

### Tables (5 tests)
- ✅ Data table verification
- ✅ Sortable tables (multiple columns)
- ✅ Finding specific data
- ✅ Edit/Delete actions
- ✅ Table data parsing

### File Operations (3 tests)
- ✅ File Upload
- ✅ File Download
- ✅ Secure File Download

### Status Codes (4 tests)
- ✅ 200 OK
- ✅ 301 Moved Permanently
- ✅ 404 Not Found
- ✅ 500 Internal Server Error

### UI Components (6 tests)
- ✅ JQuery UI Menus
- ✅ WYSIWYG Editor (TinyMCE)
- ✅ Horizontal Slider
- ✅ Dropdown menus
- ✅ Challenging DOM
- ✅ Floating Menu

### Advanced Scenarios (15 tests)
- ✅ A/B Testing
- ✅ Broken Images detection
- ✅ Disappearing Elements
- ✅ Entry Ad modal
- ✅ Exit Intent modal
- ✅ Notification Messages
- ✅ Redirect Links
- ✅ Infinite Scroll
- ✅ Large DOM
- ✅ Slow Resources
- ✅ Geolocation
- ✅ Typos detection
- ✅ Shifting Content
- ✅ Shadow DOM
- ✅ Forgot Password

**Total: 70+ individual test cases covering all 44 scenarios!**

## 🚀 Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

## 📦 Installation

Follow these steps to set up the project:

### Step 1: Navigate to Project Directory

```bash
cd playwright-tests
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- Playwright Test framework
- TypeScript
- All required dependencies

### Step 3: Install Playwright Browsers

```bash
npx playwright install
```

This downloads the browser binaries (Chromium, Firefox, WebKit) needed for testing.

## 🎯 Running Tests

### Run All Tests

```bash
npm test
```

This runs all tests in headless mode across all configured browsers.

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed
```

Useful for debugging - you can see what the browser is doing.

### Run Tests with UI Mode (Interactive)

```bash
npm run test:ui
```

Opens Playwright's UI mode where you can:
- See all tests
- Run tests individually
- Watch tests execute
- Debug step-by-step

### Run Tests in Debug Mode

```bash
npm run test:debug
```

Opens Playwright Inspector for detailed debugging with breakpoints.

### Run Specific Test File

```bash
npx playwright test tests/auth.spec.ts
```

### Run Specific Test by Name

```bash
npx playwright test -g "Form Authentication - Successful Login"
```

### Run Tests in Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests in Parallel

```bash
npx playwright test --workers=4
```

## 📊 Viewing Test Reports

### Generate and View HTML Report

After running tests:

```bash
npm run test:report
```

Or:

```bash
npx playwright show-report
```

This opens an interactive HTML report showing:
- Test results
- Screenshots (on failure)
- Videos (on failure)
- Traces
- Test duration

## 📁 Project Structure

```
playwright-tests/
├── tests/
│   ├── auth.spec.ts                    # Authentication tests
│   ├── form-elements.spec.ts           # Form interaction tests
│   ├── alerts-dynamic.spec.ts          # Alerts and dynamic content
│   ├── interactions.spec.ts            # Drag/drop, hovers, frames
│   ├── tables-status-misc.spec.ts      # Tables, status codes, misc
│   └── advanced.spec.ts                # Advanced scenarios
├── playwright.config.ts                # Playwright configuration
├── package.json                        # Project dependencies
├── tsconfig.json                       # TypeScript configuration
└── README.md                           # This file
```

## ⚙️ Configuration

### Browser Configuration

Edit `playwright.config.ts` to customize:

- Test timeout
- Number of retries
- Parallel execution
- Base URL
- Screenshot/video options
- Browsers to test (Chromium, Firefox, WebKit)

### Example Configuration Changes

```typescript
// Change test timeout to 60 seconds
timeout: 60000,

// Run tests serially (no parallel)
fullyParallel: false,

// Always take screenshots
screenshot: 'on',
```

## 🔍 Debugging Tests

### Method 1: Use Playwright Inspector

```bash
npm run test:debug
```

### Method 2: Use VS Code Debugger

1. Install "Playwright Test for VSCode" extension
2. Click on the play button next to any test
3. Add breakpoints in your code

### Method 3: Use console.log

Add `console.log()` statements in tests:

```typescript
test('my test', async ({ page }) => {
  console.log('Current URL:', page.url());
  // ... rest of test
});
```

### Method 4: Slow Down Execution

```bash
npx playwright test --headed --slow-mo=1000
```

This adds a 1-second delay between each action.

## 📸 Screenshots and Videos

### Screenshots

Screenshots are automatically captured on test failures and saved to:
```
test-results/
```

### Videos

Videos are recorded for failed tests and saved to:
```
test-results/
```

## 🐛 Common Issues and Solutions

### Issue: Tests failing with timeout

**Solution:** Increase timeout in `playwright.config.ts`:
```typescript
timeout: 60000, // 60 seconds
```

### Issue: Browsers not installed

**Solution:** Run:
```bash
npx playwright install
```

### Issue: Port already in use

**Solution:** Kill the process using the port or change the port in config.

### Issue: Tests pass locally but fail in CI

**Solution:** Ensure:
- Same Node.js version
- Browsers installed in CI
- Set retries: `retries: 2`

## 📝 Writing New Tests

### Basic Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('My Test Suite', () => {
  
  test('My test case', async ({ page }) => {
    // Navigate
    await page.goto('/your-path');
    
    // Interact
    await page.click('button');
    await page.fill('#input', 'text');
    
    // Assert
    await expect(page.locator('h1')).toHaveText('Expected Text');
  });
  
});
```

## 🎓 Learning Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [The Internet - Test Site](https://the-internet.herokuapp.com)

## 📋 Quick Command Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npx playwright install` | Install browsers |
| `npm test` | Run all tests |
| `npm run test:headed` | Run with visible browser |
| `npm run test:ui` | Run in UI mode |
| `npm run test:debug` | Debug mode |
| `npm run test:report` | View HTML report |
| `npx playwright test tests/auth.spec.ts` | Run specific file |
| `npx playwright test --project=chromium` | Run in Chrome only |
| `npx playwright test -g "login"` | Run tests matching "login" |

## 🤝 Best Practices

1. **Use descriptive test names** - Make it clear what the test does
2. **Keep tests independent** - Each test should work standalone
3. **Use proper waits** - Let Playwright handle waiting automatically
4. **Add assertions** - Every test should verify something
5. **Handle dynamic content** - Use proper locators and waits
6. **Clean up after tests** - Reset state when needed
7. **Use Page Objects** - For larger projects, consider Page Object Model

## 📄 License

This project is for educational and practice purposes.

## 🙏 Credits

- Test site: [the-internet.herokuapp.com](https://the-internet.herokuapp.com) by Dave Haeffner
- Test framework: [Playwright](https://playwright.dev/) by Microsoft

---

Happy Testing! 🎭
