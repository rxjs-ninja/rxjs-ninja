# @rxjs-ninja/rxjs-number

**npm:** `@rxjs-ninja/rxjs-number` (6.x) · **peer:** `rxjs@7` · **API:** https://rxjs-ninja.tane.dev/modules/number.html

Numeric streams: arithmetic, parsing, formatting, statistics, `Math.*`, and `Intl.NumberFormat`.

## Import

```ts
import { from } from 'rxjs';
import { add, coerceNumber, intlNumberFormat, abs } from '@rxjs-ninja/rxjs-number';
```

## Categories & operators

### Create

| Function | Emits |
|----------|--------|
| `fromNumber()` | Incrementing numbers (see docs for options) |
| `fromFibonacci()` | Fibonacci sequence |

### Arithmetic (per emission)

Right-hand side can be a number or `Observable<number>`:

`add`, `sub`, `mul`, `div`, `mod`, `pow`

```ts
import { from } from 'rxjs';
import { add } from '@rxjs-ninja/rxjs-number';

from([1, 2, 3]).pipe(add(5)).subscribe(console.log); // 6, 7, 8
```

### Math (ECMAScript)

Unary `Math` on each number: `abs`, `sign`, `sqrt`, `floor`, `ceil`, `round` (`trunc`), trig / hyperbolic (`sin`, `cos`, `tan`, `asin`, …), `log`, `log2`, `log10`, `exp`, `hypot`, `cbrt`, …

```ts
import { of } from 'rxjs';
import { abs, sign } from '@rxjs-ninja/rxjs-number';

of(-4).pipe(abs()).subscribe(console.log);
```

### Distribution (iterable of numbers → one number)

Use when each emission is an **array of numbers**:

`mean`, `median`, `min`, `max`

```ts
import { from } from 'rxjs';
import { mean } from '@rxjs-ninja/rxjs-number';

from([[1, 2, 3], [10, 15, 8]]).pipe(mean()).subscribe(console.log);
```

### Filter

`filterInRange`, `filterOutOfRange`, `filterIsFloat`, `filterIsInteger`, `filterIsFinite`, `filterIsSafeInteger`, `filterNaN`

### Query (boolean per number)

`inRange`, `outOfRange`, `isFloat`, `isInteger`, `isFinite`, `isSafeInteger`, `isNaN`, `isNotNaN`, `isMod`

### Parsing (string → number)

`parseFloat`, `parseInt`, `parseHex`

### Formatting (number → string)

`toFixed`, `toExponential`, `toPrecision`, `toHex`, `toLocaleString`, `toString`, `roundTo`

### Conversion

| Operator | Emits |
|----------|--------|
| `coerceNumber` | `Number(value)` per emission |

### Intl

| Operator | Emits |
|----------|--------|
| `intlNumberFormat(locale, options?)` | Formatted string |
| `intlNumberFormatParts` | `Intl.NumberFormatPart[]` |
| `intlNumberFormatRange` | Range string (source: `[start, end]`) |

```ts
import { of } from 'rxjs';
import { intlNumberFormat, intlNumberFormatRange } from '@rxjs-ninja/rxjs-number';

of(1000).pipe(intlNumberFormat('en-US')).subscribe(console.log);
of([1, 5] as [number, number]).pipe(intlNumberFormatRange('en-US')).subscribe(console.log);
```

### Constants

`NUMBER_EPSILON`, `NUMBER_MAX_SAFE_INTEGER`, `NUMBER_MIN_SAFE_INTEGER`, `NUMBER_MAX_VALUE`, `NUMBER_MIN_VALUE`, `NUMBER_NAN`, `NUMBER_POSITIVE_INFINITY`, `NUMBER_NEGATIVE_INFINITY` — same values as global `Number.*`.

## Gotchas

- **Distribution operators** expect an iterable emission, not a single scalar.
- **`parseInt` / `parseFloat`** operators emit numbers; pair with string package for string sources.
- Arithmetic operators shadow global names only inside your import list; alias at import if needed.
