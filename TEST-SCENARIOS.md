# Test Scenarios Overview

Complete list of automated test scenarios for the-internet.herokuapp.com

## 📝 Test Files and Scenarios

### 1. auth.spec.ts (4 tests)

**Authentication Tests**
- ✅ Basic Authentication - Valid Credentials
  - Navigates with credentials in URL
  - Verifies success message appears
  
- ✅ Form Authentication - Successful Login
  - Fills username: tomsmith
  - Fills password: SuperSecretPassword!
  - Clicks login button
  - Verifies redirect to secure page
  - Verifies success flash message
  
- ✅ Form Authentication - Invalid Credentials
  - Attempts login with invalid credentials
  - Verifies error message appears
  
- ✅ Form Authentication - Logout
  - Logs in successfully
  - Clicks logout button
  - Verifies redirect to login page
  - Verifies logout message

---

### 2. form-elements.spec.ts (5 tests)

**Form Elements Tests**
- ✅ Checkboxes - Check and Uncheck
  - Verifies initial checkbox states
  - Checks first checkbox
  - Unchecks second checkbox
  - Verifies all states
  
- ✅ Dropdown - Select Options
  - Selects Option 1
  - Selects Option 2
  - Verifies selected values
  
- ✅ Input Fields - Type and Clear
  - Types numbers in input field
  - Clears and types new numbers
  - Types negative numbers
  - Verifies all values
  
- ✅ File Upload
  - Uploads a test file
  - Clicks upload button
  - Verifies upload success message
  - Verifies filename appears
  
- ✅ Add/Remove Elements
  - Verifies no delete buttons initially
  - Adds 3 elements
  - Verifies 3 delete buttons exist
  - Removes elements one by one
  - Verifies all elements removed

---

### 3. alerts-dynamic.spec.ts (8 tests)

**JavaScript Alerts Tests**
- ✅ JS Alert - Accept Alert
  - Clicks alert button
  - Handles alert dialog
  - Verifies success message
  
- ✅ JS Confirm - Accept
  - Clicks confirm button
  - Accepts confirm dialog
  - Verifies "Ok" result
  
- ✅ JS Confirm - Dismiss
  - Clicks confirm button
  - Dismisses confirm dialog
  - Verifies "Cancel" result
  
- ✅ JS Prompt - Enter Text
  - Clicks prompt button
  - Enters text in prompt
  - Verifies entered text appears

**Dynamic Content Tests**
- ✅ Dynamic Loading - Hidden Element
  - Clicks start button
  - Waits for loading indicator
  - Verifies "Hello World!" appears
  
- ✅ Dynamic Loading - Rendered Element
  - Clicks start button
  - Waits for element to render
  - Verifies "Hello World!" appears
  
- ✅ Dynamic Controls - Remove/Add Checkbox
  - Removes checkbox
  - Verifies removal message
  - Adds checkbox back
  - Verifies addition message
  
- ✅ Dynamic Controls - Enable/Disable Input
  - Enables disabled input
  - Types in enabled input
  - Disables input
  - Verifies all states

---

### 4. interactions.spec.ts (7 tests)

**Drag and Drop Tests**
- ✅ Drag and Drop - Swap Elements
  - Verifies initial positions (A, B)
  - Drags A to B position
  - Verifies elements swapped (B, A)

**Hover Tests**
- ✅ Hovers - Show User Information
  - Hovers over user 1, verifies caption
  - Hovers over user 2, verifies caption
  - Hovers over user 3, verifies caption

**Frames Tests**
- ✅ Nested Frames - Access Frame Content
  - Accesses top frame
  - Accesses left, middle, right frames
  - Accesses bottom frame
  - Verifies text in each frame
  
- ✅ iFrame - Edit Content
  - Switches to iframe
  - Clears editor content
  - Types new content
  - Verifies content appears

**Context Menu Tests**
- ✅ Context Menu - Right Click
  - Right clicks on hot spot
  - Handles alert dialog
  - Verifies alert message

**Key Presses Tests**
- ✅ Key Presses - Detect Key Events
  - Presses Enter, verifies detection
  - Presses Space, verifies detection
  - Presses Tab, verifies detection
  - Presses Escape, verifies detection
  - Presses letter A, verifies detection

---

### 5. tables-status-misc.spec.ts (11 tests)

**Tables Tests**
- ✅ Sortable Data Table - Verify Data
  - Reads first row data
  - Clicks sort header
  - Verifies sorted order
  
- ✅ Sortable Data Table - Find Largest Due
  - Iterates through all rows
  - Finds person with largest due amount
  - Verifies the person found

**Status Codes Tests**
- ✅ Status Codes - 200 OK
  - Clicks 200 link
  - Verifies page content
  
- ✅ Status Codes - 301 Moved Permanently
- ✅ Status Codes - 404 Not Found
- ✅ Status Codes - 500 Internal Server Error

**Miscellaneous Tests**
- ✅ Broken Images - Detect Broken Images
  - Checks all images on page
  - Detects broken images by naturalWidth
  - Verifies broken images exist
  
- ✅ Challenging DOM - Interact with Elements
  - Clicks three different buttons
  - Verifies table exists
  - Clicks edit and delete links
  
- ✅ Disappearing Elements - Check Menu Items
  - Counts menu items
  - Verifies at least 4 items exist
  - Logs all menu items
  
- ✅ Entry Ad - Close Modal
  - Waits for modal to appear
  - Closes modal
  - Verifies modal closed
  
- ✅ Exit Intent - Trigger Exit Modal
  - Moves mouse to trigger exit intent
  - Verifies modal appears
  - Closes modal
  
- ✅ Notification Messages - Verify Messages
  - Clicks to load notification
  - Verifies notification appears
  - Verifies message is one of expected messages

---

### 6. advanced.spec.ts (14 tests)

**Redirect Tests**
- ✅ Redirect Link - Follow Redirect
  - Clicks redirect link
  - Verifies final URL
  
- ✅ Multiple Redirects
  - Follows multiple redirects
  - Verifies final destination

**Infinite Scroll Tests**
- ✅ Infinite Scroll - Load More Content
  - Gets initial content count
  - Scrolls to bottom
  - Verifies more content loaded
  - Scrolls again
  - Verifies even more content

**Large DOM Tests**
- ✅ Large DOM - Navigate Through Table
  - Verifies page loads
  - Finds and verifies table
  - Verifies siblings div
  - Counts table rows

**Slow Resources Tests**
- ✅ Slow Resources - Wait for Page Load
  - Waits for slow page to load (45s timeout)
  - Verifies page eventually loads

**Geolocation Tests**
- ✅ Geolocation - Check Location
  - Grants geolocation permission
  - Sets specific coordinates
  - Clicks "Where am I?" button
  - Verifies coordinates displayed

**Horizontal Slider Tests**
- ✅ Horizontal Slider - Move Slider
  - Sets slider to value 3
  - Sets slider to value 4.5
  - Sets slider to max value 5
  - Verifies each value

**Typos Tests**
- ✅ Typos - Check for Typos
  - Gets all paragraphs
  - Checks for known typos
  - Logs detection result

**Shifting Content Tests**
- ✅ Shifting Content - Menu Element
  - Gets menu items
  - Reloads page
  - Verifies content shifts
  
- ✅ Shifting Content - Image
  - Verifies image is visible

**Shadow DOM Tests**
- ✅ Shadow DOM - Access Shadow Content
  - Accesses shadow DOM
  - Verifies shadow content visible

**Floating Menu Tests**
- ✅ Floating Menu - Scroll and Verify Menu Stays
  - Verifies menu visible
  - Scrolls down page
  - Verifies menu still visible
  - Clicks all menu items

---

### 7. additional-scenarios-1.spec.ts (10 tests)

**A/B Testing Tests**
- ✅ A/B Test - Verify Variant Display
  - Gets heading text
  - Verifies it's either "Control" or "Variation 1"
  - Logs which variant is shown

**Digest Authentication Tests**
- ✅ Digest Authentication - Valid Credentials
  - Navigates with digest auth credentials
  - Verifies success message

**File Download Tests**
- ✅ File Download - Download File
  - Gets download links
  - Starts download
  - Saves file temporarily
  - Verifies file exists
  - Cleans up file

- ✅ Secure File Download - Download with Authentication
  - Navigates to secure download page
  - Verifies download links exist

**Forgot Password Tests**
- ✅ Forgot Password - Request Password Reset
  - Fills in email
  - Clicks retrieve password
  - Verifies response received

**Multiple Windows Tests**
- ✅ Multiple Windows - Open New Window
  - Clicks link to open new window
  - Waits for new window
  - Verifies new window content
  - Verifies original page still exists
  - Closes new window

- ✅ Multiple Windows - Switch Between Windows
  - Opens new window
  - Switches between windows
  - Verifies content in each
  - Closes new window

**JavaScript Error Tests**
- ✅ JavaScript onload event error - Detect Console Error
  - Listens for console messages
  - Listens for page errors
  - Verifies errors are captured

---

### 8. additional-scenarios-2.spec.ts (15 tests)

**JQuery UI Menu Tests**
- ✅ JQuery UI Menus - Navigate Menu Items
  - Hovers over "Enabled" menu
  - Verifies submenu appears
  - Hovers over "Downloads"
  - Verifies nested submenu
  - Clicks on submenu item

- ✅ JQuery UI Menus - Disabled Menu Item
  - Finds disabled menu item
  - Verifies disabled class
  - Attempts to click (should fail)

- ✅ JQuery UI Menus - Back to JQuery UI
  - Clicks "Back to JQuery UI" link
  - Verifies navigation

**WYSIWYG Editor Tests**
- ✅ WYSIWYG Editor - Type and Format Text
  - Switches to TinyMCE iframe
  - Clears and types text
  - Clicks Bold button
  - Types bold text
  - Verifies content

- ✅ WYSIWYG Editor - File Menu Operations
  - Clicks File menu
  - Verifies menu items visible

- ✅ WYSIWYG Editor - Format Text
  - Types text
  - Selects all
  - Clicks Italic button
  - Verifies formatting

**Dynamic Content Tests - Extended**
- ✅ Dynamic Content - Content Changes on Refresh
  - Gets initial content
  - Refreshes page
  - Compares content
  - Logs differences

- ✅ Dynamic Content - Static Content Mode
  - Navigates with static parameter
  - Verifies content consistency

**JQuery UI Tests - Additional**
- ✅ JQuery UI - Drag and Drop
  - Verifies main page loaded
  - Counts available examples

**Sortable Data Tables - Extended Tests**
- ✅ Table - Sort by Email Column
  - Clicks Email header
  - Verifies sort order

- ✅ Table - Sort by Due Amount
  - Clicks Due header
  - Parses all due amounts
  - Logs sorted values

- ✅ Table - Edit and Delete Actions
  - Gets edit/delete links
  - Verifies links exist
  - Gets href attributes

**Secure Area Tests**
- ✅ Secure Area - Direct Access Without Login
  - Attempts direct access
  - Verifies redirect or error

**Heroku Authentication Tests**
- ✅ Form Based Login - Multiple Attempts
  - Makes failed attempts
  - Verifies error messages
  - Makes successful attempt

---

## 📊 Test Statistics

- **Total Test Files:** 8
- **Total Test Cases:** 70+
- **Total Scenarios Covered:** 44/44 (100%)
- **Total Test Suites:** 30+

### Test Distribution by Category:
- Authentication: 5 tests
- Form Elements: 5 tests
- JavaScript: 4 tests
- Dynamic Content: 6 tests
- Interactions: 5 tests
- Frames & iFrames: 2 tests
- Tables: 5 tests
- File Operations: 3 tests
- Status Codes: 4 tests
- UI Components: 6 tests
- Advanced Scenarios: 15 tests
- Additional Features: 10+ tests

## 🎯 Coverage

### Covered Test Types:
- ✅ Form Interactions
- ✅ Authentication Flows
- ✅ JavaScript Dialogs
- ✅ Dynamic Content
- ✅ Drag & Drop
- ✅ Frames & iFrames
- ✅ Mouse Interactions
- ✅ Keyboard Interactions
- ✅ File Operations
- ✅ Table Manipulation
- ✅ HTTP Status Codes
- ✅ Modal Windows
- ✅ Notifications
- ✅ Redirects
- ✅ Infinite Scrolling
- ✅ Geolocation
- ✅ Sliders
- ✅ Shadow DOM
- ✅ Floating Elements

## 🔧 Test Characteristics

### Waits & Synchronization:
- Explicit waits for dynamic content
- Network idle waits for slow resources
- Timeout handling for loading elements
- Dialog handling with async operations

### Assertions:
- Visibility checks
- Text content verification
- URL validation
- Element state verification
- Attribute checking
- Count verification

### Browser Interactions:
- Click events
- Form filling
- File uploads
- Mouse movements
- Keyboard inputs
- Right-click context menus
- Drag and drop operations

---

## 📈 Running Specific Test Suites

```bash
# Run only authentication tests
npx playwright test tests/auth.spec.ts

# Run only form element tests
npx playwright test tests/form-elements.spec.ts

# Run only alert tests
npx playwright test tests/alerts-dynamic.spec.ts

# Run only interaction tests
npx playwright test tests/interactions.spec.ts

# Run only table and status tests
npx playwright test tests/tables-status-misc.spec.ts

# Run only advanced tests
npx playwright test tests/advanced.spec.ts

# Run tests matching a pattern
npx playwright test -g "login"
npx playwright test -g "checkbox"
npx playwright test -g "alert"
```

---

## 🎓 Learning Path

### Beginner Level (Start Here):
1. auth.spec.ts - Learn basic navigation and form filling
2. form-elements.spec.ts - Learn element interactions
3. alerts-dynamic.spec.ts - Learn dialog handling

### Intermediate Level:
4. interactions.spec.ts - Learn drag/drop, frames, keyboard
5. tables-status-misc.spec.ts - Learn table parsing, status codes

### Advanced Level:
6. advanced.spec.ts - Learn complex scenarios, timing, edge cases

---

*Last Updated: 2024*
