#!/bin/bash

# Setup script for Playwright Tests
# This script automates the setup process

echo "🎭 Setting up Playwright Test Suite..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""

# Install Playwright browsers
echo "🌐 Installing Playwright browsers..."
npx playwright install

if [ $? -eq 0 ]; then
    echo "✅ Playwright browsers installed successfully"
else
    echo "❌ Failed to install Playwright browsers"
    exit 1
fi

echo ""
echo "✨ Setup completed successfully!"
echo ""
echo "📝 Quick Start Commands:"
echo "   npm test              - Run all tests"
echo "   npm run test:headed   - Run with visible browser"
echo "   npm run test:ui       - Run in UI mode"
echo "   npm run test:debug    - Debug mode"
echo ""
echo "📚 See README.md for detailed documentation"
