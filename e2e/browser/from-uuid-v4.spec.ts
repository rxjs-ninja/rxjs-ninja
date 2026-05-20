import { expect, test } from '@playwright/test';
import { runBundledTest } from '../support/browser-page';

test.describe('fromUUIDv4 (Chrome)', () => {
  test('generates a valid UUID', async ({ page }) => {
    const length = await runBundledTest<number>(page, 'from-uuid-v4.js', 'uuidLength');
    expect(length).toBe(36);
  });

  test('generates UUIDs on an interval', async ({ page }) => {
    const elapsed = await runBundledTest<number>(page, 'from-uuid-v4.js', 'uuidIntervalTiming');
    expect(elapsed).toBeGreaterThanOrEqual(1800);
    expect(elapsed).toBeLessThan(3500);
  });
});
