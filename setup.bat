@echo off
REM Setup script for Playwright Tests (Windows)
REM This script automates the setup process

echo.
echo Setting up Playwright Test Suite...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo npm version:
npm --version
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies
    pause
    exit /b 1
)

echo Dependencies installed successfully
echo.

REM Install Playwright browsers
echo Installing Playwright browsers...
call npx playwright install

if %ERRORLEVEL% NEQ 0 (
    echo Failed to install Playwright browsers
    pause
    exit /b 1
)

echo Playwright browsers installed successfully
echo.
echo Setup completed successfully!
echo.
echo Quick Start Commands:
echo    npm test              - Run all tests
echo    npm run test:headed   - Run with visible browser
echo    npm run test:ui       - Run in UI mode
echo    npm run test:debug    - Debug mode
echo.
echo See README.md for detailed documentation
echo.
pause
