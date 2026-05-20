import { expect, test } from '@playwright/test';
import { runBundledTest } from '../support/browser-page';

test.describe('fromRandomCrypto (Chrome)', () => {
  test('creates random 4-byte numbers by default', async ({ page }) => {
    const count = await runBundledTest<number>(page, 'from-random-crypto.js', 'defaultBytes');
    expect(count).toBe(5);
  });

  test('creates 1-byte integers', async ({ page }) => {
    expect(await runBundledTest<number>(page, 'from-random-crypto.js', 'oneByteInt')).toBe(5);
  });

  test('creates 1-byte unsigned integers', async ({ page }) => {
    expect(await runBundledTest<number>(page, 'from-random-crypto.js', 'oneByteUnsigned')).toBe(5);
  });

  test('creates 2-byte integers', async ({ page }) => {
    expect(await runBundledTest<number>(page, 'from-random-crypto.js', 'twoByteInt')).toBe(5);
  });

  test('creates 2-byte unsigned integers', async ({ page }) => {
    expect(await runBundledTest<number>(page, 'from-random-crypto.js', 'twoByteUnsigned')).toBe(5);
  });

  test('creates 4-byte integers', async ({ page }) => {
    expect(await runBundledTest<number>(page, 'from-random-crypto.js', 'fourByteInt')).toBe(5);
  });

  test('creates 4-byte unsigned integers', async ({ page }) => {
    expect(await runBundledTest<number>(page, 'from-random-crypto.js', 'fourByteUnsigned')).toBe(5);
  });
});
