import { describe, expect, it } from 'vitest';
import { firstValueFrom } from 'rxjs';
import { digitalRubeGoldberg$ } from './digital-rube-goldberg';

describe('digital Rube Goldberg', () => {
  it(
    'runs a deterministic marble through every package',
    async () => {
      const result = await firstValueFrom(
        digitalRubeGoldberg$({ chaotic: false, fibIterations: 7 }),
      );

      expect(result.triumph).toBe(true);
      expect(result.headline).toMatch(/°F/);
      expect(result.headline.length).toBeGreaterThan(10);
      expect(result.stages.length).toBeGreaterThan(15);

      const stageNames = result.stages.map((s) => s.stage);
      expect(stageNames.some((n) => n.includes('Fibonacci'))).toBe(true);
      expect(stageNames.some((n) => n.includes('boiler'))).toBe(true);
      expect(stageNames.some((n) => n.includes('victory bell'))).toBe(true);
    },
    10_000,
  );
});
