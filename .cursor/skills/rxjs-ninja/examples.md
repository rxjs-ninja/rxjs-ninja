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

## Choosing packages (quick)

| Task | Install |
|------|---------|
| Set union / groupBy on arrays | `@rxjs-ninja/rxjs-array` |
| Skip empty strings | `@rxjs-ninja/rxjs-boolean` |
| `Intl.NumberFormat` | `@rxjs-ninja/rxjs-number` |
| `Intl.ListFormat` | `@rxjs-ninja/rxjs-string` |
| UUID / crypto int | `@rxjs-ninja/rxjs-random` |
| Celsius → Fahrenheit | `@rxjs-ninja/rxjs-utility` |
