# RxJS Ninja examples

## Digital Rube Goldberg

[`digital-rube-goldberg.ts`](./digital-rube-goldberg.ts) chains operators from all six `@rxjs-ninja` packages into one Observable “machine.”

From the repo root (after `npm install`):

```bash
npx vitest run examples/digital-rube-goldberg.spec.ts
```

Deterministic run (no shuffle, fixed Fibonacci length):

```ts
import { firstValueFrom } from 'rxjs';
import { digitalRubeGoldberg$ } from './digital-rube-goldberg';

const result = await firstValueFrom(
  digitalRubeGoldberg$({ chaotic: false, fibIterations: 7 }),
);
console.log(result.headline, result.triumph);
```
