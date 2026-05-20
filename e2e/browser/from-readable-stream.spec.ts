import { expect, test } from '@playwright/test';
import { runBundledTest } from '../support/browser-page';

test.describe('fromReadableStream (Chrome)', () => {
  test('emits summed stream values', async ({ page }) => {
    const sum = await runBundledTest<number>(page, 'from-readable-stream.js', 'sumStream');
    expect(sum).toBe(4950);
  });

  test('stops when abort signal fires', async ({ page }) => {
    const sum = await runBundledTest<number>(page, 'from-readable-stream.js', 'sumUntilAbort');
    expect(sum).toBe(1275);
  });

  test('supports a custom queue strategy', async ({ page }) => {
    const sum = await runBundledTest<number>(page, 'from-readable-stream.js', 'sumWithQueueStrategy');
    expect(sum).toBe(4950);
  });

  test('throws when abort ends the stream as error', async ({ page }) => {
    const message = await runBundledTest<string>(page, 'from-readable-stream.js', 'abortThrows');
    expect(message).toMatch(/aborted/i);
  });
});
