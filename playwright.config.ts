import { defineConfig, devices } from '@playwright/test';

// Worker processes reload this config without the CLI flags, so pass "headed" down through an env var
if (process.argv.includes('--headed')) process.env.PW_HEADED = '1';
const headed = process.env.PW_HEADED === '1';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        // Headed Firefox can hang while finishing the video when the context closes
        video: headed ? 'off' : 'retain-on-failure',
        launchOptions: {
          firefoxUserPrefs: {
            // In headed mode on Windows, Firefox stops rendering windows that are covered by
            // other windows. Parallel workers overlap each other, so clicks wait forever for a frame.
            'widget.windows.window_occlusion_tracking.enabled': false,
          },
        },
      },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
