import { test, expect } from '@playwright/test';

test.describe('Transaction Entry Flow', () => {
  test('user can enter and save a transaction', async ({ page }) => {
    // Navigate to transaction form page
    await page.goto('/transactions/new'); // Assuming this route exists

    // Fill out the form
    await page.fill('input[name="amount"]', '150.50');
    await page.fill('input[name="date"]', '2023-10-15');
    await page.fill('input[name="description"]', 'Grocery shopping');
    await page.selectOption('select[name="type"]', 'expense');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for success message
    await expect(page.locator('text=Transaction saved successfully!')).toBeVisible();

    // Verify form is cleared
    await expect(page.locator('input[name="amount"]')).toHaveValue('');
    await expect(page.locator('input[name="description"]')).toHaveValue('');

    // Optionally, check if transaction appears in list
    await page.goto('/transactions'); // Assuming transactions list page
    await expect(page.locator('text=Grocery shopping')).toBeVisible();
    await expect(page.locator('text=$150.50')).toBeVisible();
  });

  test('form validation prevents invalid submission', async ({ page }) => {
    await page.goto('/transactions/new');

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Check validation errors
    await expect(page.locator('text=Amount must be a positive number')).toBeVisible();
    await expect(page.locator('text=Description is required')).toBeVisible();
    await expect(page.locator('text=Please enter a valid date not in the future')).toBeVisible();

    // Fill invalid amount
    await page.fill('input[name="amount"]', '-50');
    await page.fill('input[name="description"]', 'Test');
    await page.fill('input[name="date"]', '2023-01-01');
    await page.selectOption('select[name="type"]', 'expense');

    await page.click('button[type="submit"]');

    // Should still show amount error
    await expect(page.locator('text=Amount must be a positive number')).toBeVisible();
  });

  test('user can view transaction history', async ({ page }) => {
    // Assuming user is logged in and has transactions
    await page.goto('/transactions');

    // Check that transactions are displayed
    await expect(page.locator('text=Transaction History')).toBeVisible();

    // Verify at least one transaction exists (from previous test)
    const transactionCount = await page.locator('.transaction-item').count();
    expect(transactionCount).toBeGreaterThan(0);
  });
});
