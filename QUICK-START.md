# 🚀 Quick Start Guide

Get up and running with Playwright tests in 5 minutes!

## ⚡ Fast Setup (Recommended)

### For Mac/Linux:

```bash
cd playwright-tests
chmod +x setup.sh
./setup.sh
```

### For Windows:

```cmd
cd playwright-tests
setup.bat
```

---

## 📝 Manual Setup (Step by Step)

### Step 1: Install Node.js

If you don't have Node.js installed:
- Download from: https://nodejs.org/
- Install version 16 or higher
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### Step 2: Navigate to Project

```bash
cd playwright-tests
```

### Step 3: Install Dependencies

```bash
npm install
```

Wait for installation to complete (~30 seconds)

### Step 4: Install Browsers

```bash
npx playwright install
```

This downloads Chrome, Firefox, and Safari browsers (~300MB)

---

## 🎯 Run Your First Test

### Option 1: Run All Tests (Headless)

```bash
npm test
```

You'll see test results in the terminal.

### Option 2: See Tests Run (Headed Mode)

```bash
npm run test:headed
```

Browsers will open and you can watch tests execute!

### Option 3: Interactive UI Mode (Best for Learning)

```bash
npm run test:ui
```

Opens a UI where you can:
- ✅ Select tests to run
- ✅ Watch tests step-by-step
- ✅ See what's being clicked
- ✅ Debug failures

---

## 📊 View Test Results

After running tests:

```bash
npm run test:report
```

Opens a beautiful HTML report showing:
- ✅ All test results
- ✅ Screenshots (on failure)
- ✅ Videos (on failure)
- ✅ Test duration
- ✅ Detailed logs

---

## 🎓 Your First Test File

Let's look at a simple test:

```typescript
// tests/auth.spec.ts
import { test, expect } from '@playwright/test';

test('Form Authentication - Successful Login', async ({ page }) => {
  // 1. Navigate to login page
  await page.goto('/login');
  
  // 2. Fill in credentials
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');
  
  // 3. Click login button
  await page.click('button[type="submit"]');
  
  // 4. Verify we're on secure page
  await expect(page).toHaveURL(/.*secure/);
  
  // 5. Verify success message
  const flashMessage = page.locator('#flash');
  await expect(flashMessage).toContainText('You logged into a secure area!');
});
```

**What's happening:**
1. `page.goto()` - Navigate to a URL
2. `page.fill()` - Type into input fields
3. `page.click()` - Click a button
4. `expect()` - Verify something happened

---

## 🔥 Common Commands

| What I Want | Command |
|-------------|---------|
| Run all tests | `npm test` |
| See browser while testing | `npm run test:headed` |
| Debug a test | `npm run test:debug` |
| Open UI mode | `npm run test:ui` |
| Run one test file | `npx playwright test tests/auth.spec.ts` |
| Run tests with "login" in name | `npx playwright test -g "login"` |
| View last test report | `npm run test:report` |

---

## 🐛 Troubleshooting

### ❌ Error: "node not found"
**Fix:** Install Node.js from https://nodejs.org/

### ❌ Error: "Executable doesn't exist"
**Fix:** Run `npx playwright install`

### ❌ Tests are timing out
**Fix:** Check your internet connection, or increase timeout in `playwright.config.ts`

### ❌ Can't see what's happening
**Fix:** Use headed mode: `npm run test:headed`

---

## 📚 Next Steps

1. ✅ Run the tests
2. ✅ Read `TEST-SCENARIOS.md` to see all available tests
3. ✅ Read `README.md` for detailed documentation
4. ✅ Try modifying a test
5. ✅ Write your own test!

---

## 💡 Pro Tips

### Tip 1: Use UI Mode for Learning
```bash
npm run test:ui
```
This is the BEST way to understand what tests do.

### Tip 2: Run One Test at a Time
```bash
npx playwright test tests/auth.spec.ts
```
Easier to focus and debug.

### Tip 3: Use Headed Mode for Debugging
```bash
npm run test:headed
```
See what the browser is doing.

### Tip 4: Slow Down Tests
```bash
npx playwright test --headed --slow-mo=1000
```
Adds 1-second delay between actions.

---

## 🎯 Practice Exercises

### Exercise 1: Run Your First Test
```bash
npx playwright test tests/auth.spec.ts -g "Successful Login"
```

### Exercise 2: Watch a Test Run
```bash
npm run test:headed
```

### Exercise 3: Use UI Mode
```bash
npm run test:ui
```
Click on "Form Authentication - Successful Login" and watch it run!

### Exercise 4: View the Report
```bash
npm test
npm run test:report
```

---

## 🏆 You're Ready!

You now have:
- ✅ 70+ working test scenarios
- ✅ Tests covering ALL 44 scenarios from the-internet.herokuapp.com
- ✅ Multiple ways to run and debug tests
- ✅ HTML reports and screenshots
- ✅ Example code to learn from

**Start exploring and happy testing!** 🎭

---

## 📞 Need Help?

- Playwright Docs: https://playwright.dev/docs/intro
- Test Site: https://the-internet.herokuapp.com
- See README.md for more details
- See TEST-SCENARIOS.md for all test cases
- See COVERAGE-CHECKLIST.md for complete scenario list

---

**Time to run tests:** ~5 minutes
**Time to complete setup:** ~2 minutes
**Number of scenarios:** 70+ tests covering all 44 scenarios
**Browsers:** Chrome, Firefox, Safari
