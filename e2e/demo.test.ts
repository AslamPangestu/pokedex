import { expect, test } from '@playwright/test';

test('Hompage exist', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();

	const items = page.getByTestId('card-component');
	await expect(items).toBeVisible();
	await expect((await items.all()).length).toBe(20);
});
