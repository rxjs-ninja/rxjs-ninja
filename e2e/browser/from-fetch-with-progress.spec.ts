import { expect, test } from '@playwright/test';
import { runBundledTest } from '../support/browser-page';

test.describe('fromFetchWithProgress (Chrome)', () => {
  test('reports download progress and returns a Uint8Array', async ({ page }) => {
    const result = await runBundledTest<{ percents: number[]; isUint8Array: boolean }>(
      page,
      'from-fetch-with-progress.js',
      'fetchWithProgress',
    );
    expect(result.percents).toEqual([0.2, 0.4, 0.6, 0.8, 1]);
    expect(result.isUint8Array).toBe(true);
  });

  test('errors when the response has no body', async ({ page }) => {
    const message = await runBundledTest<string>(page, 'from-fetch-with-progress.js', 'emptyBodyError');
    expect(message).toBe('Response body is empty');
  });

  test('errors when the response is not ok', async ({ page }) => {
    const message = await runBundledTest<string>(page, 'from-fetch-with-progress.js', 'notOkError');
    expect(message).toBe('500: Unknown Error');
  });
});
