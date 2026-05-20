import path from 'node:path';
import type { Page } from '@playwright/test';

const runnerHtml = path.resolve(__dirname, '../fixtures/runner.html');
const publicDir = path.resolve(__dirname, '../public');

export async function runBundledTest<T>(
  page: Page,
  bundleFile: string,
  exportName: string,
): Promise<T> {
  await page.goto(`file://${runnerHtml}`);
  await page.evaluate(() => {
    delete (window as unknown as { RxjsNinjaE2E?: unknown }).RxjsNinjaE2E;
  });
  await page.addScriptTag({ path: path.join(publicDir, bundleFile) });
  return page.evaluate((name) => {
    const mod = (window as { RxjsNinjaE2E: Record<string, () => Promise<T>> }).RxjsNinjaE2E;
    const fn = mod[name];
    if (typeof fn !== 'function') {
      throw new Error(`Missing export ${name} on RxjsNinjaE2E`);
    }
    return fn();
  }, exportName);
}
