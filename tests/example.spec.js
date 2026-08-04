import { test, expect } from '@playwright/test';

test('should load the homepage and check title elements', async ({ page }) => {
  // Change the URL to match your local Next.js development server port
  await page.goto('http://localhost:3000/');

  // Verify that the page body or main heading is visible
  const mainHeading = page.locator('h1');
  await expect(mainHeading).toBeVisible();
});
