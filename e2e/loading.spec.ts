import { test, expect } from '@playwright/test';

test.describe('Loading screen', () => {
  test('shows splash on first visit and hides it', async ({ page }) => {
    // Remove the session flag BEFORE page loads so the splash runs
    await page.addInitScript(() => sessionStorage.removeItem('hasSeenLoading'));
    await page.goto('/es');

    const splash = page.locator('.loading-screen');
    await expect(splash).toBeVisible();

    // 1200ms delay + 500ms isComplete + 500ms hide + 500ms exit animation = ~2700ms
    await expect(splash).not.toBeVisible({ timeout: 4500 });
    await expect(page.getByText('Hola, soy')).toBeVisible();
  });

  test('skips splash on second visit (sessionStorage set)', async ({ page }) => {
    // Set flag before page loads — LoadingScreen skips immediately
    await page.addInitScript(() => sessionStorage.setItem('hasSeenLoading', 'true'));
    await page.goto('/es');

    await expect(page.locator('.loading-screen')).not.toBeVisible();
    await expect(page.getByText('Hola, soy')).toBeVisible();
  });

  test('skips splash with prefers-reduced-motion', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/es');

    await expect(page.locator('.loading-screen')).not.toBeVisible();
    await expect(page.getByText('Hola, soy')).toBeVisible();
    await context.close();
  });
});
