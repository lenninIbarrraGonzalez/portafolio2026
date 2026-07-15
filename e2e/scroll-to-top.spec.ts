import { test, expect } from '@playwright/test';

test.describe('ScrollToTop button', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('hasSeenLoading', 'true'));
    await page.goto('/es');
    await expect(page.locator('.loading-screen')).not.toBeVisible({ timeout: 2000 });
    await expect(page.getByText('Hola, soy')).toBeVisible();
  });

  test('button is not visible at the top of the page', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Scroll to top' })).not.toBeVisible();
  });

  test('button appears after scrolling past 35% threshold', async ({ page }) => {
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.evaluate((y) => window.scrollTo(0, y), Math.ceil(scrollHeight * 0.4));
    await page.waitForTimeout(300);

    await expect(page.getByRole('button', { name: 'Scroll to top' })).toBeVisible({ timeout: 2000 });
  });

  test('clicking button scrolls back to top', async ({ page }) => {
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.evaluate((y) => window.scrollTo(0, y), Math.ceil(scrollHeight * 0.5));
    await page.waitForTimeout(300);

    await page.getByRole('button', { name: 'Scroll to top' }).click();
    await page.waitForFunction(() => window.scrollY < 100, { timeout: 3000 });
  });
});
