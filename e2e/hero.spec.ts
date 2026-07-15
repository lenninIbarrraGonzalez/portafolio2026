import { test, expect } from '@playwright/test';

test.describe('Hero section', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('hasSeenLoading', 'true'));
    await page.goto('/es');
    await expect(page.locator('.loading-screen')).not.toBeVisible({ timeout: 2000 });
    await expect(page.getByText('Hola, soy')).toBeVisible();
  });

  test('"Ver proyectos" button scrolls to #projects', async ({ page }) => {
    await page.getByRole('button', { name: 'Ver proyectos' }).click();
    await expect(page.locator('#projects')).toBeInViewport({ timeout: 3000 });
  });

  test('scroll indicator arrow scrolls to #about', async ({ page }) => {
    const scrollBtn = page.getByRole('button', { name: 'Desplazar hacia abajo' });
    await expect(scrollBtn).toBeVisible({ timeout: 3000 });
    // The button has an infinite bounce animation (y: [0,10,0]) so Playwright
    // considers it "not stable". force:true skips the stability check.
    await scrollBtn.click({ force: true });
    await expect(page.locator('#about')).toBeInViewport({ timeout: 4000 });
  });

  test('CV download button has download attribute', async ({ page }) => {
    const downloadBtn = page.getByRole('link', { name: /descargar cv|download cv/i });
    await expect(downloadBtn).toHaveAttribute('download');
  });

  test('"Contáctame" button links to LinkedIn (external)', async ({ page }) => {
    const contactBtn = page.getByRole('link', { name: 'Contáctame' });
    const href = await contactBtn.getAttribute('href');
    expect(href).toContain('linkedin.com');
    await expect(contactBtn).toHaveAttribute('target', '_blank');
  });
});
