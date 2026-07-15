import { test, expect } from '@playwright/test';

test.describe('Projects carousel', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('hasSeenLoading', 'true'));
    await page.goto('/es');
    await expect(page.locator('.loading-screen')).not.toBeVisible({ timeout: 2000 });

    // Scroll projects into view and let in-view animation complete
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
  });

  test('next button advances the carousel', async ({ page }) => {
    // The carousel controls row has: [prevBtn] [dots-div] [nextBtn]
    // Use the direct child button that comes AFTER the dots div
    const controlsRow = page.locator('section#projects .flex.justify-center.gap-4');
    const nextBtn = controlsRow.locator('> button').last();

    const dot1 = page.locator('section#projects').getByRole('button', { name: 'Go to slide 1' });
    await expect(dot1).toHaveClass(/w-8/);

    await nextBtn.click();
    await page.waitForTimeout(600);

    await expect(dot1).not.toHaveClass(/w-8/);
  });

  test('prev button goes to last slide (loop)', async ({ page }) => {
    const controlsRow = page.locator('section#projects .flex.justify-center.gap-4');
    const prevBtn = controlsRow.locator('> button').first();

    await prevBtn.click();
    await page.waitForTimeout(700);

    const dot7 = page.locator('section#projects').getByRole('button', { name: 'Go to slide 7' });
    await expect(dot7).toHaveClass(/w-8/);
  });

  test('dot indicator navigates to correct slide', async ({ page }) => {
    // Scope to section#projects to avoid conflict with ClientDemos carousel
    const dot4 = page.locator('section#projects').getByRole('button', { name: 'Go to slide 4' });
    await dot4.click();
    await page.waitForTimeout(700);

    await expect(dot4).toHaveClass(/w-8/);
  });

  test('clicking a project card opens the modal', async ({ page }) => {
    await page.locator('section#projects button.tilt-card').first().click();
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 2000 });
    await expect(page.getByRole('dialog').getByText('DITU', { exact: false })).toBeVisible();
  });

  test('close button closes the modal', async ({ page }) => {
    await page.locator('section#projects button.tilt-card').first().click();
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 2000 });

    await page.getByRole('button', { name: 'Close modal' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 2000 });
  });

  test('Escape key closes the modal', async ({ page }) => {
    await page.locator('section#projects button.tilt-card').first().click();
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 2000 });

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 1000 });
  });
});
