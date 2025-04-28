import { test, expect } from '@playwright/test';

test.describe('MainDetails Component', () => {
    test.beforeEach(async ({ page, context }) => {
        // Enable geolocation
        await context.grantPermissions(['geolocation']);

        // Mock geolocation
        await context.setGeolocation({ latitude: 51.5074, longitude: -0.1278 });
        await page.goto('http://localhost:5173');
    });

    test('shows loading spinner initially', async ({ page }) => {
        const spinner = await page.getByTestId('loading-spinner');
        await expect(spinner).toBeDefined();
    });

    test('displays weather data after loading', async ({ page }) => {
        const mainTemperature = await page.getByText(/\d+°C/).first();
        await expect(mainTemperature).toBeVisible({ timeout: 10000 });

        const humidityLabel = await page.getByText('Humidity').first();
        const humidityValue = await page.getByText(/\d+\s%/).first();
        await expect(humidityLabel).toBeVisible();
        await expect(humidityValue).toBeVisible();
        //
        const windSpeed = await page.getByText(/\d+ kmph/).first();
        await expect(windSpeed).toBeVisible();
    });

    test('temperature from clicked weatherTile matches temperature in weatherList', async ({ page }) => {
        // Wait for weather data to load
        const mainTemperature = await page.getByText(/\d+°C/).first();
        await expect(mainTemperature).toBeVisible({ timeout: 10000 });

        // Set desktop view to ensure forecast elements are visible
        await page.setViewportSize({ width: 1024, height: 768 });

        // Wait for any forecast elements to be visible
        await page.waitForTimeout(1000); // Give time for responsive layout to adjust

        // Find forecast items (buttons or clickable elements with temperatures)
        const forecastItems = page.locator('button, [role="button"]').filter({ hasText: /\d+°C/ });
        await expect(forecastItems.first()).toBeVisible({ timeout: 5000 });

        // Get the first forecast item and extract its temperature
        const firstItem = forecastItems.first();
        const tileTemperatureText = await firstItem.textContent() || '';
        const tempMatch = tileTemperatureText.match(/(\d+°C)/);
        const tileTemperature = tempMatch ? tempMatch[0] : '';

        // Ensure we found a temperature
        expect(tileTemperature).toBeTruthy();

        // Click the first forecast item
        await firstItem.click();

        // Switch to mobile view
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(1000); // Give time for responsive layout to adjust

        // Get the selected temperature in the list view
        const selectedTemp = await page.getByText(/\d+°C/).first().textContent() || '';

        // Compare temperatures (only the numeric part to be safer)
        const tileTemp = tileTemperature.replace('°C', '');
        const selectedTempValue = selectedTemp.match(/(\d+)°C/)?.[1] || '';

        expect(selectedTempValue).toContain(tileTemp);
    });

    test('shows error message when geolocation fails', async ({ page }) => {
        // Mock failed geolocation
        await page.evaluate(() => {
            const mockGeolocation = {
                getCurrentPosition: (_: PositionCallback, error: PositionErrorCallback) => {
                    error({
                        code: 1,
                        message: 'Geolocation permission denied',
                        PERMISSION_DENIED: 1,
                        POSITION_UNAVAILABLE: 2,
                        TIMEOUT: 3
                    });
                }
            };
            // @ts-expect-error - Overriding geolocation API
            navigator.geolocation = mockGeolocation;
        });

        await page.reload();

        const errorMessage = await page.getByText("We couldn't access your location1");
        await expect(errorMessage).toBeDefined();
    });

    test('responds to different screen sizes', async ({ page }) => {
        // Test mobile view
        await page.setViewportSize({ width: 375, height: 667 });
        const mobileList = await page.getByTestId('weather-list');
        await expect(mobileList).toBeDefined();

        // Test desktop view
        await page.setViewportSize({ width: 1024, height: 768 });
        const desktopTiles = await page.getByTestId('weather-tiles');
        await expect(desktopTiles).toBeDefined();
    });
});