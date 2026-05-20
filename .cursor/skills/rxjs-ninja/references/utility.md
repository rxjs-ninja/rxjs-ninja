# @rxjs-ninja/rxjs-utility

**npm:** `@rxjs-ninja/rxjs-utility` (6.x) · **peer:** `rxjs@7` · **API:** https://rxjs-ninja.tane.dev/modules/utility.html

Cross-cutting utilities: conditional mapping, taps, unit conversion, colours, JWT, debounce, streams, and browser APIs.

## Import

```ts
import { from } from 'rxjs';
import { temperature, tapOnSubscribe, mapIf } from '@rxjs-ninja/rxjs-utility';
import { Temperatures } from '@rxjs-ninja/rxjs-utility';
```

## Categories & operators

### Conversion (units)

| Operator | Use |
|----------|-----|
| `temperature(from, to)` | Celsius ↔ Fahrenheit ↔ Kelvin |
| `length(from, to, precision?)` | km, miles, feet, … |
| `weight(from, to, precision?)` | kg, lb, … |

Enums: `Temperatures`, `Lengths`, `Weights`.

```ts
from([10, 50, 100])
  .pipe(temperature(Temperatures.CELSIUS, Temperatures.FAHRENHEIT))
  .subscribe(); // 50, 122, 212
```

### Colour

| Operator | Emits |
|----------|--------|
| `rgbToHex`, `rgbaToHex` | Hex strings |
| `hexToRGBA` | `rgb(...)` / `rgba(...)` strings |

### Mapping (conditional)

| Operator | Use |
|----------|-----|
| `mapIf(predicate, ifTrue, ifFalse)` | Map based on condition |
| `switchMapIf(predicate, ifTrue$, ifFalse$)` | Switch on condition |

### Side effects (tap variants)

| Operator | When it runs |
|----------|----------------|
| `tapOnSubscribe` | Each subscription |
| `tapOnUnsubscribe` | Teardown |
| `tapOnFirstEmit` | First emission only |
| `tapIf(predicate, fn)` | When predicate true |

```ts
fromEvent(document, 'click').pipe(
  tapOnSubscribe(() => console.log('subscribed')),
  tapIf((e) => e.target.id === 'btn', () => console.log('btn click')),
);
```

### Streams & HTTP (browser)

| Function | Use |
|----------|-----|
| `fromReadableStream` | Observable from WHATWG ReadableStream |
| `toWritableStream` | Write emissions to WritableStream |
| `fromFetchWithProgress` | Fetch with progress events |
| `fromEventSource` | Server-Sent Events |
| `fromWebSerial` | Web Serial API |

See StackBlitz demos linked from package README.

### Other

| Operator | Use |
|----------|-----|
| `decodeJWT` | Parse JWT payload from string emission |
| `debounceWithQuery` | Debounce using query string / URL params |
| `takeUntilSignal` | Complete when `AbortSignal` aborts |
| `length` | String/array length of emission |

## Types

Re-exported from `./types/utility` (see API docs for full list).

## Gotchas

- **Browser APIs** need DOM or secure context; not all operators run in Node.
- **Unit enums** must match supported conversion pairs (see TypeDoc).
- **`mapIf` / `switchMapIf`**: predicates run per emission; keep functions pure.

## Example (FizzBuzz)

```ts
import { from } from 'rxjs';
import { mapIf } from '@rxjs-ninja/rxjs-utility';

from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).pipe(
  mapIf(
    (n) => n % 15 === 0 || n % 3 === 0 || n % 5 === 0,
    (n) => (n % 15 === 0 ? 'FizzBuzz' : n % 3 === 0 ? 'Fizz' : 'Buzz'),
    (n) => n,
  ),
).subscribe();
```
