import { test, expect } from '@playwright/test';

test.describe('Header navigation', () => {
  test.use({ colorScheme: 'dark' });

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('hasSeenLoading', 'true'));
    await page.goto('/es');
    // LoadingScreen renders for one frame even when skipped — wait for it to clear
    await expect(page.locator('.loading-screen')).not.toBeVisible({ timeout: 2000 });
    await expect(page.getByText('Hola, soy')).toBeVisible();
  });

  test('nav link "Sobre mí" scrolls to #about section', async ({ page }) => {
    await page.getByRole('button', { name: 'Sobre mí' }).first().click();
    await expect(page.locator('#about')).toBeInViewport({ timeout: 3000 });
  });

  test('nav link "Proyectos" scrolls to #projects section', async ({ page }) => {
    await page.getByRole('button', { name: 'Proyectos' }).first().click();
    await expect(page.locator('#projects')).toBeInViewport({ timeout: 3000 });
  });

  test('logo link stays on the same page (does not navigate away)', async ({ page }) => {
    // The logo is href="#" — its purpose is to link to the page root without
    // navigating to another route. With Lenis + Next.js the scroll is intercepted,
    // so we assert the URL stays on /es rather than asserting scrollY.
    await page.getByRole('link', { name: /lennin/i }).click();
    await expect(page).toHaveURL(/\/es/);
  });

  test('theme toggle switches dark/light mode', async ({ page }) => {
    await expect(page.locator('html')).toHaveClass(/dark/);
    // When dark, aria-label is "Modo claro" (click to switch to light)
    await page.getByRole('button', { name: 'Modo claro' }).click();
    await expect(page.locator('html')).not.toHaveClass(/dark/, { timeout: 2000 });
  });

  test('language toggle switches to English', async ({ page }) => {
    await page.getByRole('button', { name: 'Idioma' }).click();
    await expect(page).toHaveURL(/\/en/, { timeout: 5000 });
    await expect(page.getByText("Hi, I'm")).toBeVisible();
  });
});

test.describe('Mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('hasSeenLoading', 'true'));
    await page.goto('/es');
    await expect(page.locator('.loading-screen')).not.toBeVisible({ timeout: 2000 });
    await expect(page.getByText('Hola, soy')).toBeVisible();
  });

  test('hamburger opens and closes mobile menu', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: 'Menu' });
    await menuButton.click();

    await expect(page.getByRole('button', { name: 'Sobre mí' }).first()).toBeVisible();

    await menuButton.click();
    await expect(page.getByRole('button', { name: 'Sobre mí' }).first()).not.toBeVisible();
  });

  test('clicking a mobile nav item closes the menu', async ({ page }) => {
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('button', { name: 'Sobre mí' }).first().click();

    await expect(page.getByRole('button', { name: 'Menu' })).toBeVisible();
  });
});
