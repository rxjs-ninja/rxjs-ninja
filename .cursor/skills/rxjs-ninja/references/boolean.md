# @rxjs-ninja/rxjs-boolean

**npm:** `@rxjs-ninja/rxjs-boolean` (5.x) · **peer:** `rxjs@7` · **API:** https://rxjs-ninja.tane.dev/modules/boolean.html

Truthiness, boolean streams, logical combinators, and validation (e.g. Luhn).

## Import

```ts
import { from } from 'rxjs';
import { firstTruthy, and, isTruthy } from '@rxjs-ninja/rxjs-boolean';
```

## Categories & operators

### Create

| Function | Emits |
|----------|--------|
| `fromBoolean(iterable)` | `boolean` per item (truthy/falsy rules) |

```ts
import { fromBoolean } from '@rxjs-ninja/rxjs-boolean';

fromBoolean([0, 1, '', 'RxJS']).subscribe(console.log);
// false, true, false, true
```

### Filter (truthy / falsy)

| Operator | Keeps |
|----------|--------|
| `filterTruthy(predicate?)` | Truthy values (optional custom predicate) |
| `filterFalsy(predicate?)` | Falsy values; **no predicate** = all falsy emissions |
| `firstTruthy`, `lastTruthy`, `firstFalsy`, `lastFalsy` | First/last match in stream |

```ts
import { from } from 'rxjs';
import { firstTruthy, lastTruthy } from '@rxjs-ninja/rxjs-boolean';

from(['RxJS', '', 'Ninja']).pipe(firstTruthy()).subscribe(console.log);
from(['RxJS', '', 'Ninja']).pipe(lastTruthy((v) => v.length < 5)).subscribe(console.log);
```

### Query

| Operator | Emits |
|----------|--------|
| `isBoolean`, `isTruthy`, `isFalsy` | `boolean` per emission |
| `booleanEvery`, `booleanSome`, `booleanNone` | Single `boolean` after stream completes |
| `toBoolean` | Coerce to boolean |

### Combinator

Combine each boolean emission with a fixed value or `Observable<boolean>`:

| Operator | Logic |
|----------|--------|
| `and`, `or`, `xor`, `nand` | `source OP other` |

```ts
import { of } from 'rxjs';
import { and, booleanSome } from '@rxjs-ninja/rxjs-boolean';

of(true, false).pipe(and(true)).subscribe(console.log);
of(false, true, false).pipe(booleanSome()).subscribe(console.log);
```

### Modify

| Operator | Emits |
|----------|--------|
| `flip` | Negated boolean |

### Validation

| Operator | Emits |
|----------|--------|
| `luhnCheck` | `boolean` per string (card numbers) |

```ts
import { from } from 'rxjs';
import { luhnCheck } from '@rxjs-ninja/rxjs-boolean';

from(['4485275742308327', '1111222233334444']).pipe(luhnCheck()).subscribe(console.log);
```

## Types

`PredicateFn` — optional `(value) => boolean` on several filters.

## Gotchas

- **`filterFalsy()`** without arguments keeps **falsy** values (`0`, `''`), not truthy ones.
- Combinators use **latest** value from `other` when it is an Observable (`withLatestFrom` pattern).
- Import combinators as named exports: `import { and, or } from '@rxjs-ninja/rxjs-boolean'`.
