# SauceDemo E-commerce Application Test Plan

## Application Overview

Comprehensive test plan for the SauceDemo e-commerce application covering login, product browsing, shopping cart, checkout, and user account scenarios. The application allows users to browse products, add items to cart, checkout, and complete orders.

## Test Scenarios

### 1. Authentication & Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with standard_user

**File:** `tests/auth/login-successful.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads with username and password fields
    - expect: Login button is visible
  2. Enter 'standard_user' in username field
    - expect: No error messages displayed
  3. Enter 'secret_sauce' in password field
    - expect: No error messages displayed
  4. Click login button
    - expect: User redirected to inventory page
    - expect: Page title shows 'Swag Labs'
    - expect: Products are displayed

#### 1.2. Login with locked account shows error

**File:** `tests/auth/login-locked-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads
  2. Enter 'locked_out_user' in username field
    - expect: No error messages displayed
  3. Enter 'secret_sauce' in password field
    - expect: No error messages displayed
  4. Click login button
    - expect: Error message 'Epic sadface: Sorry, this user has been locked out.' is displayed
    - expect: User remains on login page

#### 1.3. Login with invalid credentials shows error

**File:** `tests/auth/login-invalid-credentials.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads
  2. Enter 'invalid_user' in username field
    - expect: No error messages displayed
  3. Enter 'wrong_password' in password field
    - expect: No error messages displayed
  4. Click login button
    - expect: Error message 'Epic sadface: Username and password do not match any user in this service' is displayed
    - expect: User remains on login page

#### 1.4. Login with empty fields shows error

**File:** `tests/auth/login-empty-fields.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads
  2. Leave username field empty
    - expect: No error messages displayed
  3. Leave password field empty
    - expect: No error messages displayed
  4. Click login button
    - expect: Error message 'Epic sadface: Username is required' is displayed

#### 1.5. User can logout successfully

**File:** `tests/auth/logout-functionality.spec.ts`

**Steps:**
  1. Login with standard_user credentials
    - expect: User is logged in and on inventory page
  2. Click Open Menu button
    - expect: Menu opens with All Items, About, Logout, Reset App State options
  3. Click Logout option
    - expect: User redirected to login page
    - expect: Login form is displayed

#### 1.6. Login with performance_glitch_user

**File:** `tests/auth/login-performance-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads
  2. Enter 'performance_glitch_user' in username field
    - expect: Login completes within reasonable time
  3. Enter 'secret_sauce' in password field
    - expect: Login completes within reasonable time
  4. Click login button
    - expect: User redirected to inventory page

#### 1.7. Login with problem_user shows broken images

**File:** `tests/auth/login-problem-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads
  2. Enter 'problem_user' in username field
    - expect: No error messages displayed
  3. Enter 'secret_sauce' in password field
    - expect: No error messages displayed
  4. Click login button
    - expect: User redirected to inventory page
    - expect: Product images may be broken

#### 1.8. Login with error_user shows error on certain actions

**File:** `tests/auth/login-error-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads
  2. Enter 'error_user' in username field
    - expect: No error messages displayed
  3. Enter 'secret_sauce' in password field
    - expect: No error messages displayed
  4. Click login button
    - expect: User redirected to inventory page

### 2. Product Browsing & Inventory

**Seed:** `tests/seed.spec.ts`

#### 2.1. Inventory page displays all products correctly

**File:** `tests/products/inventory-display.spec.ts`

**Steps:**
  1. Login with standard_user
    - expect: User is logged in
  2. Verify inventory page loads
    - expect: 6 products are displayed
    - expect: Each product shows image, name, description, price
    - expect: Add to cart buttons are visible
  3. Check product order
    - expect: Products are displayed in default order (Name A-Z)

#### 2.2. Product sorting functionality works correctly

**File:** `tests/products/product-sorting.spec.ts`

**Steps:**
  1. Login with standard_user
    - expect: User is logged in and on inventory page
  2. Select 'Name (Z to A)' from sort dropdown
    - expect: Products sorted by name Z-A
  3. Select 'Price (low to high)' from sort dropdown
    - expect: Products sorted by price low to high
  4. Select 'Price (high to low)' from sort dropdown
    - expect: Products sorted by price high to low
  5. Select 'Name (A to Z)' from sort dropdown
    - expect: Products sorted by name A-Z

#### 2.3. Product detail page navigation works

**File:** `tests/products/product-detail-navigation.spec.ts`

**Steps:**
  1. Login with standard_user
    - expect: User is logged in and on inventory page
  2. Click on any product name
    - expect: Product detail page loads with image, description, price
  3. Click 'Back to products' button
    - expect: User returned to inventory page

#### 2.4. Add to cart from product detail page

**File:** `tests/products/product-detail-add-to-cart.spec.ts`

**Steps:**
  1. Login with standard_user
    - expect: User is logged in and on inventory page
  2. Click on product name
    - expect: Product detail page loads
  3. Click 'Add to cart' button on detail page
    - expect: Cart badge shows '1'
    - expect: Button changes to 'Remove'

#### 2.5. Menu navigation options work

**File:** `tests/products/menu-navigation.spec.ts`

**Steps:**
  1. Login with standard_user
    - expect: User is logged in and on inventory page
  2. Click Open Menu button
    - expect: Menu opens
  3. Click 'All Items' option
    - expect: User stays on inventory page
  4. Click Close Menu button
    - expect: Menu closes

#### 2.6. Reset App State clears cart

**File:** `tests/products/reset-app-state.spec.ts`

**Steps:**
  1. Login with standard_user
    - expect: User is logged in and on inventory page
  2. Add item to cart
    - expect: Cart badge appears
  3. Open menu and click 'Reset App State'
    - expect: Cart badge disappears
    - expect: Add to cart buttons return

### 3. Shopping Cart Functionality

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add multiple items to cart

**File:** `tests/cart/add-multiple-items.spec.ts`

**Steps:**
  1. Login with standard_user
    - expect: User is logged in and on inventory page
  2. Add first item to cart
    - expect: Cart badge shows '1'
  3. Add second item to cart
    - expect: Cart badge shows '2'
  4. Add third item to cart
    - expect: Cart badge shows '3'

#### 3.2. Cart page displays items correctly

**File:** `tests/cart/cart-page-display.spec.ts`

**Steps:**
  1. Add items to cart
    - expect: User has items in cart
  2. Click shopping cart icon
    - expect: Cart page loads
    - expect: Items display with quantity, name, description, price
  3. Verify cart page elements
    - expect: Continue Shopping and Checkout buttons are visible

#### 3.3. Remove items from cart

**File:** `tests/cart/remove-from-cart.spec.ts`

**Steps:**
  1. Add items to cart
    - expect: User has items in cart
  2. Navigate to cart page
    - expect: Cart page loads
  3. Click Remove button for an item
    - expect: Item removed from cart
    - expect: Cart badge updates

#### 3.4. Continue shopping from cart

**File:** `tests/cart/continue-shopping.spec.ts`

**Steps:**
  1. Add items to cart
    - expect: User has items in cart
  2. Navigate to cart page
    - expect: Cart page loads
  3. Click 'Continue Shopping' button
    - expect: User returned to inventory page

#### 3.5. Cart contents persist across navigation

**File:** `tests/cart/cart-persistence.spec.ts`

**Steps:**
  1. Login with standard_user
    - expect: User is logged in
  2. Add item to cart
    - expect: Cart badge appears
  3. Navigate to product detail page
    - expect: Cart badge still shows
  4. Return to inventory page
    - expect: Cart badge still shows

#### 3.6. Cannot checkout with empty cart

**File:** `tests/cart/empty-cart-checkout.spec.ts`

**Steps:**
  1. Login with standard_user
    - expect: User is logged in with empty cart
  2. Verify cart is empty
    - expect: Cart icon shows no badge
  3. Attempt to navigate to cart/checkout
    - expect: Empty cart message or checkout blocked

### 4. Checkout Process

**Seed:** `tests/seed.spec.ts`

#### 4.1. Checkout step one form validation

**File:** `tests/checkout/checkout-step-one-validation.spec.ts`

**Steps:**
  1. Add items to cart and proceed to checkout
    - expect: User has items in cart
  2. Try to continue with empty fields
    - expect: First Name, Last Name, Zip/Postal Code fields are required
  3. Verify validation messages
    - expect: Error message displayed

#### 4.2. Checkout step one with valid data

**File:** `tests/checkout/checkout-step-one-success.spec.ts`

**Steps:**
  1. Add items to cart and proceed to checkout
    - expect: User has items in cart
  2. Fill First Name field
    - expect: No error messages
  3. Fill Last Name field
    - expect: No error messages
  4. Fill Zip/Postal Code field
    - expect: No error messages
  5. Click Continue button
    - expect: User proceeds to checkout step two

#### 4.3. Checkout step two displays order summary

**File:** `tests/checkout/checkout-step-two-overview.spec.ts`

**Steps:**
  1. Complete checkout step one
    - expect: User on checkout step two
  2. Verify order summary
    - expect: Items, quantities, prices displayed
    - expect: Payment information shown
    - expect: Shipping information shown
    - expect: Tax calculation correct
    - expect: Total calculation correct
  3. Check available actions
    - expect: Cancel and Finish buttons visible

#### 4.4. Cancel checkout returns to cart

**File:** `tests/checkout/checkout-cancel.spec.ts`

**Steps:**
  1. Navigate to checkout step two
    - expect: User on checkout step two
  2. Click Cancel button
    - expect: User returned to cart page

#### 4.5. Complete checkout process

**File:** `tests/checkout/checkout-complete.spec.ts`

**Steps:**
  1. Navigate to checkout step two
    - expect: User on checkout step two
  2. Click Finish button
    - expect: Order completion page loads
    - expect: Success message displayed
    - expect: Order confirmation shown

#### 4.6. Post-checkout cart is empty

**File:** `tests/checkout/post-checkout-state.spec.ts`

**Steps:**
  1. Complete full checkout process
    - expect: Order completed successfully
  2. Return to inventory page
    - expect: Cart is empty
    - expect: No cart badge shown
  3. Verify product buttons reset
    - expect: All items show 'Add to cart' buttons

### 5. Error Handling & Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 5.1. Handle network connectivity issues

**File:** `tests/error/network-connectivity.spec.ts`

**Steps:**
  1. Simulate network disconnection during checkout
    - expect: Application handles offline state gracefully
  2. Verify error handling
    - expect: Appropriate error messages displayed

#### 5.2. Handle page refresh during checkout

**File:** `tests/error/page-refresh.spec.ts`

**Steps:**
  1. Add items to cart
    - expect: User has items in cart
  2. Refresh page during checkout process
    - expect: User redirected to login or cart preserved

#### 5.3. Handle browser navigation

**File:** `tests/error/browser-back-forward.spec.ts`

**Steps:**
  1. Use browser back/forward during checkout
    - expect: User can navigate back/forward without issues
  2. Verify application state
    - expect: State maintained appropriately

#### 5.4. Direct URL access to protected pages

**File:** `tests/error/invalid-url-access.spec.ts`

**Steps:**
  1. Try to access inventory page without login
    - expect: User redirected to login
  2. Try to access cart page without login
    - expect: User redirected to login
  3. Try to access checkout pages without login
    - expect: User redirected to login

#### 5.5. Handle large number of cart items

**File:** `tests/error/large-cart.spec.ts`

**Steps:**
  1. Add all 6 items to cart
    - expect: Application handles multiple items
  2. Verify cart page
    - expect: Cart displays all items correctly
  3. Complete checkout with full cart
    - expect: Checkout process works with many items

### 6. Performance & Responsiveness

**Seed:** `tests/seed.spec.ts`

#### 6.1. Page load performance

**File:** `tests/performance/page-load-times.spec.ts`

**Steps:**
  1. Measure login page load time
    - expect: Pages load within 3 seconds
  2. Measure inventory page load time
    - expect: Pages load within 3 seconds
  3. Measure cart page load time
    - expect: Pages load within 3 seconds
  4. Measure checkout pages load time
    - expect: Pages load within 3 seconds

#### 6.2. Image loading performance

**File:** `tests/performance/image-loading.spec.ts`

**Steps:**
  1. Verify all product images load on inventory page
    - expect: Product images load within 5 seconds
  2. Verify product detail images load
    - expect: Product images load within 5 seconds

#### 6.3. Checkout flow performance

**File:** `tests/performance/checkout-flow.spec.ts`

**Steps:**
  1. Time complete checkout process from cart to completion
    - expect: Checkout completes within 10 seconds

#### 6.4. Memory usage during extended sessions

**File:** `tests/performance/memory-usage.spec.ts`

**Steps:**
  1. Navigate through multiple checkout cycles
    - expect: No memory leaks during extended use
  2. Verify performance after multiple operations
    - expect: Application remains responsive

### 7. Accessibility & Usability

**Seed:** `tests/seed.spec.ts`

#### 7.1. Keyboard navigation support

**File:** `tests/accessibility/keyboard-navigation.spec.ts`

**Steps:**
  1. Navigate login form using Tab key
    - expect: All interactive elements accessible via keyboard
  2. Navigate inventory page using Tab key
    - expect: All interactive elements accessible via keyboard
  3. Navigate cart and checkout using Tab key
    - expect: All interactive elements accessible via keyboard

#### 7.2. Screen reader compatibility

**File:** `tests/accessibility/screen-reader.spec.ts`

**Steps:**
  1. Verify product images have descriptive alt text
    - expect: All images have alt text
  2. Check form field accessibility
    - expect: Form fields have labels
  3. Verify button accessibility
    - expect: Buttons have descriptive text

#### 7.3. Color contrast compliance

**File:** `tests/accessibility/color-contrast.spec.ts`

**Steps:**
  1. Check text contrast ratios
    - expect: Text meets WCAG contrast requirements
  2. Verify error message visibility
    - expect: Error messages clearly visible

#### 7.4. Responsive design across devices

**File:** `tests/accessibility/responsive-design.spec.ts`

**Steps:**
  1. Test on mobile viewport
    - expect: Layout adapts to different screen sizes
  2. Test on tablet viewport
    - expect: Layout adapts to different screen sizes
  3. Test on desktop viewport
    - expect: Layout adapts to different screen sizes
