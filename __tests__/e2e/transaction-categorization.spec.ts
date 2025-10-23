import { test, expect } from '@playwright/test';

test('transaction categorization e2e', async ({ page }) => {
  await page.goto('/'); // Assuming the form is on home

  // Fill form
  await page.fill('input[name="amount"]', '100');
  await page.fill('input[name="date"]', '2023-10-01');
  await page.fill('input[name="description"]', 'Office supplies');
  await page.selectOption('select[name="type"]', 'expense');

  // Wait for categorization
  await page.waitForSelector('text=Suggested: business');

  // Category should be set to business
  await expect(page.locator('select[name="category"]')).toHaveValue('business');

  // User can override
  await page.selectOption('select[name="category"]', 'personal');

  // Submit
  await page.click('button[type="submit"]');

  // Check success message
  await expect(page.locator('text=Transaction saved successfully!')).toBeVisible();
});
