import { test, expect } from '@playwright/test';

test.describe('Internationalization', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('hasSeenLoading', 'true'));
    await page.goto('/es');
    await expect(page.getByText('Hola, soy')).toBeVisible();
  });

  test('/es renders Spanish content', async ({ page }) => {
    await expect(page.getByText('Hola, soy')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ver proyectos' })).toBeVisible();
  });

  test('/en renders English content', async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('hasSeenLoading', 'true'));
    await page.goto('/en');
    await expect(page.getByText("Hi, I'm")).toBeVisible();
    await expect(page.getByRole('button', { name: 'View projects' })).toBeVisible();
  });

  test('globe button switches from es to en', async ({ page }) => {
    await page.getByRole('button', { name: 'Idioma' }).click();
    await expect(page).toHaveURL(/\/en/, { timeout: 5000 });
    await expect(page.getByText("Hi, I'm")).toBeVisible();
  });

  test('globe button switches from en back to es', async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('hasSeenLoading', 'true'));
    await page.goto('/en');
    await expect(page.getByText("Hi, I'm")).toBeVisible();

    await page.getByRole('button', { name: 'Language' }).click();
    await expect(page).toHaveURL(/\/es/, { timeout: 5000 });
    await expect(page.getByText('Hola, soy')).toBeVisible();
  });
});
