# RxJS Ninja — consumer examples

Copy-paste examples use **`@rxjs-ninja/*` npm packages** and **`rxjs`**. Package details: [references/](references/).

## Compare two lists (array)

```ts
import { of } from 'rxjs';
import { intersects, difference } from '@rxjs-ninja/rxjs-array';

const tech$ = of(['RxJS', 'TypeScript', 'Angular', 'Node']);
const frontEnd$ = of(['RxJS', 'TypeScript', 'React']);

tech$.pipe(intersects(frontEnd$)).subscribe(console.log);
tech$.pipe(difference(frontEnd$)).subscribe(console.log);
```

## Build a Map from parallel streams (array)

```ts
import { of, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { toMap } from '@rxjs-ninja/rxjs-array';

const names$ = of(['RxJS', 'TypeScript']);
const kinds$ = of(['Library', 'Language']);

combineLatest([names$, kinds$]).pipe(
  map(([names, kinds]) => names.map((n, i) => [n, kinds[i]] as const)),
  toMap(),
  tap((m) => console.log(m.get('RxJS'))),
).subscribe();
```

## Group records (array)

```ts
import { of } from 'rxjs';
import { objectGroupBy } from '@rxjs-ninja/rxjs-array';

of(['x', 'xy', 'y']).pipe(objectGroupBy((s) => s.length)).subscribe(console.log);
```

## First truthy string (boolean)

```ts
import { from } from 'rxjs';
import { firstTruthy } from '@rxjs-ninja/rxjs-boolean';

from(['', 'RxJS', 'Ninja']).pipe(firstTruthy()).subscribe(console.log);
from(['', 'RxJS', 'TypeScript']).pipe(firstTruthy((v) => v.length > 5)).subscribe(console.log);
```

## Parse and format currency (number)

```ts
import { from } from 'rxjs';
import { parseFloat, toLocaleString } from '@rxjs-ninja/rxjs-number';

from(['19.99', '5.00']).pipe(
  parseFloat(),
  toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
).subscribe(console.log);
```

## Stats on batches (number)

```ts
import { from } from 'rxjs';
import { mean } from '@rxjs-ninja/rxjs-number';

from([[1, 2, 3], [10, 20, 30]]).pipe(mean()).subscribe(console.log);
```

## Slug-style string pipeline (string)

```ts
import { of } from 'rxjs';
import { toLowerCase, split, join } from '@rxjs-ninja/rxjs-string';

of('Hello World Example')
  .pipe(toLowerCase(), split(' '), join('-'))
  .subscribe(console.log);
```

## Locale-aware list label (string)

```ts
import { of } from 'rxjs';
import { intlListFormat } from '@rxjs-ninja/rxjs-string';

of(['Angular', 'RxJS', 'TypeScript']).pipe(intlListFormat('en')).subscribe(console.log);
```

## Session id / token bytes (random)

```ts
import { take } from 'rxjs/operators';
import { fromRandomBytes, fromRandomCryptoCharset } from '@rxjs-ninja/rxjs-random';

fromRandomBytes(16).pipe(take(1)).subscribe(console.log);
fromRandomCryptoCharset(32, '0123456789abcdef').pipe(take(1)).subscribe(console.log);
```

## Fetch download progress (utility, browser)

```ts
import { fromFetchWithProgress } from '@rxjs-ninja/rxjs-utility';

fromFetchWithProgress('/api/large-file').subscribe((event) => {
  console.log(event);
});
```

## Temperature dashboard (utility)

```ts
import { from } from 'rxjs';
import { temperature, Temperatures } from '@rxjs-ninja/rxjs-utility';

from([0, 20, 37]).pipe(
  temperature(Temperatures.CELSIUS, Temperatures.FAHRENHEIT),
).subscribe(console.log);
```

## Multi-package pipeline

```ts
import { of } from 'rxjs';
import { filterArray } from '@rxjs-ninja/rxjs-array';
import { mean } from '@rxjs-ninja/rxjs-number';
import { join } from '@rxjs-ninja/rxjs-string';

of([1, 2, 3, 4, 5, 6]).pipe(
  filterArray((n) => n % 2 === 0),
  mean(),
).subscribe(console.log);

of(['a', 'b', 'c']).pipe(join(', ')).subscribe(console.log);
```

## Digital Rube Goldberg (all six packages)

One marble visits **random → number → array → utility → string → boolean**. Full runnable source: [`examples/digital-rube-goldberg.ts`](../../../examples/digital-rube-goldberg.ts) in the repo; consumers copy the imports below.

```ts
import { from, of } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { map, switchMap, take, toArray, tap } from 'rxjs/operators';
import {
  filterArray,
  mapArray,
  objectGroupBy,
  objectValuesToArray,
  shuffle,
  sort,
  union,
} from '@rxjs-ninja/rxjs-array';
import { booleanSome, isTruthy } from '@rxjs-ninja/rxjs-boolean';
import { filterInRange, fromFibonacci, intlNumberFormat, mean, roundTo } from '@rxjs-ninja/rxjs-number';
import { fromRandomCryptoInt } from '@rxjs-ninja/rxjs-random';
import { coerceString, concat, intlListFormat, split, titleize } from '@rxjs-ninja/rxjs-string';
import { mapIf, temperature, Temperatures } from '@rxjs-ninja/rxjs-utility';

// 🎲 random picks Fibonacci length → … → 🔔 booleanSome() triumph
const result = await firstValueFrom(
  fromRandomCryptoInt(5, 8).pipe(
    take(1),
    switchMap((n) => fromFibonacci(n)),
    filterInRange(1, 21),
    toArray(),
    mapArray((n) => n ** 2),
    filterArray((n) => n % 2 === 0),
    union([0]),
    shuffle(),
    sort((a, b) => a - b),
    mean(1),
    roundTo(1),
    mapIf((n) => n < 12, (n) => n + 8, (n) => n),
    temperature(Temperatures.CELSIUS, Temperatures.FAHRENHEIT),
    intlNumberFormat('en-US', { maximumFractionDigits: 1 }),
    coerceString(),
    concat('°F — the bell rings at '),
    split(' '),
    objectGroupBy((word) => word.length),
    objectValuesToArray(),
    map((bins) => (bins as string[][]).flat()),
    intlListFormat('en', { type: 'conjunction' }),
    titleize([], ' '),
    switchMap((headline) =>
      from([headline.length > 10, /°F/.test(headline)]).pipe(
        isTruthy(),
        booleanSome(),
        switchMap((triumph) => of({ triumph, headline })),
      ),
    ),
  ),
);
```

| Step | Package | Operators |
|------|---------|-----------|
| Dice + ramp | `rxjs-random`, `rxjs-number` | `fromRandomCryptoInt`, `fromFibonacci`, `filterInRange` |
| Array machines | `rxjs-array` | `mapArray`, `filterArray`, `union`, `shuffle`, `sort` |
| Gauge + boiler | `rxjs-number`, `rxjs-utility` | `mean`, `roundTo`, `mapIf`, `temperature`, `intlNumberFormat` |
| Sign + bell | `rxjs-string`, `rxjs-boolean` | `coerceString`, `concat`, `split`, `objectGroupBy`, `intlListFormat`, `titleize`, `isTruthy`, `booleanSome` |

## Choosing packages (quick)

| Task | Install |
|------|---------|
| Set union / groupBy on arrays | `@rxjs-ninja/rxjs-array` |
| Skip empty strings | `@rxjs-ninja/rxjs-boolean` |
| `Intl.NumberFormat` | `@rxjs-ninja/rxjs-number` |
| `Intl.ListFormat` | `@rxjs-ninja/rxjs-string` |
| UUID / crypto int | `@rxjs-ninja/rxjs-random` |
| Celsius → Fahrenheit | `@rxjs-ninja/rxjs-utility` |
