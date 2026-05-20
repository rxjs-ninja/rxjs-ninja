# @rxjs-ninja/rxjs-string

**npm:** `@rxjs-ninja/rxjs-string` (6.x) · **peer:** `rxjs@7` · **API:** https://rxjs-ninja.tane.dev/modules/string.html

String operators mirroring `String.prototype`, plus creators, filters, and Intl APIs.

## Import

```ts
import { from, of } from 'rxjs';
import { split, join, coerceString, intlListFormat } from '@rxjs-ninja/rxjs-string';
```

## Categories & operators

### Creators

| Function | Emits |
|----------|--------|
| `fromString`, `fromStringRaw` (tagged template) | String(s) |
| `fromCharCode`, `fromCodePoint`, `fromUnicode` | From code units/points |

```ts
import { fromStringRaw } from '@rxjs-ninja/rxjs-string';

fromStringRaw`line1\nline2`.subscribe(console.log);
```

### Conversion

| Operator | Emits |
|----------|--------|
| `coerceString` | `String(value)` |
| `stringAt(index)` | Character at index (ES `at`) |

### Modify

`concat`, `repeat`, `replace`, `replaceAll`, `reverse`, `toLowerCase`, `toUpperCase`, `asciiLowerCase`, `asciiUpperCase`, `normalize`, `padStart`, `padEnd`, `trim`, `trimStart`, `trimEnd`, `titleize`

ASCII casing ignores locale rules (use `toLowerCase` / `toUpperCase` for Unicode locale casing).

### Query

`charAt`, `charCodeAt`, `codePointAt`, `includes`, `indexOf`, `lastIndexOf`, `startsWith`, `endsWith`, `localeCompare`, `search`, `match`, `matchAll`, `slice`, `substring`, `split`

Many accept index or search args as value or `Observable`.

### Filter

`filterStartsWith`, `filterEndsWith`, `filterIncludes`

### Mapping

`mapCharCode`, `mapCodePoint` — numbers/code points to characters.

### Convert / combine

`split` → arrays; `join` → string from emitted arrays.

```ts
import { of } from 'rxjs';
import { split, join } from '@rxjs-ninja/rxjs-string';

of('a,b,c').pipe(split(','), join('\t')).subscribe(console.log);
```

### Intl

| Operator | Emits |
|----------|--------|
| `intlCollatorCompare(against, locale, options?)` | Comparison number |
| `intlSegment(locale, options?)` | Segment strings array |
| `intlListFormat(locale, options?)` | Formatted list string |

```ts
import { of } from 'rxjs';
import { intlListFormat } from '@rxjs-ninja/rxjs-string';

of(['a', 'b', 'c']).pipe(intlListFormat('en')).subscribe(console.log);
```

### Types

`FormType` — normalization form enum for `normalize`.

## Gotchas

- **`startsWith` / `endsWith`** here are **query** operators (emit `boolean`), not RxJS `startWith`.
- **`padStart` / `padEnd`** are the actual export names (String.padStart/padEnd).
- **`fromStringRaw`**: template literal; escapes are not processed.

## Example

```ts
import { of } from 'rxjs';
import { coerceString, asciiLowerCase, localeCompare } from '@rxjs-ninja/rxjs-string';

of(42).pipe(coerceString()).subscribe();           // '42'
of('AbC').pipe(asciiLowerCase()).subscribe();      // 'abc'
of('b').pipe(localeCompare('a')).subscribe();      // 1
```
