# RxJS Ninja — reference

## Workspaces

| Package | Path | Focus |
|---------|------|--------|
| `@rxjs-ninja/rxjs-array` | `libs/rxjs/array` | Array, Set, Map, Object, TypedArray |
| `@rxjs-ninja/rxjs-boolean` | `libs/rxjs/boolean` | Truthiness, combinators, Luhn |
| `@rxjs-ninja/rxjs-number` | `libs/rxjs/number` | Math, parsing, Intl.NumberFormat |
| `@rxjs-ninja/rxjs-string` | `libs/rxjs/string` | String/Intl, ASCII casing |
| `@rxjs-ninja/rxjs-random` | `libs/rxjs/random` | `crypto.getRandomValues`, UUID |
| `@rxjs-ninja/rxjs-utility` | `libs/rxjs/utility` | Streams, JWT, units, browser APIs |

Root `package.json` workspaces; each package builds with `tsc -p tsconfig.build.json` → `dist/`.

## File layout per operator

```
libs/rxjs/<pkg>/src/
  index.ts              # explicit barrel
  lib/
    <operator>.ts       # implementation
    <operator>.spec.ts  # tests (same basename)
  types/                # shared types (array, etc.)
  utils/
    internal.ts         # createOrReturnObservable (per package)
```

## Barrel (`src/index.ts`)

- Start with package-level `@packageDocumentation` / `@module` block and `/* istanbul ignore file */`.
- Sections: `// Operators`, `// Types`, `// Utils` (as applicable).
- One export line per symbol: `export { mapArray } from './lib/map-array';`
- Never re-export the same symbol from multiple paths or under an alias.

## JSDoc standard

Mirror `libs/rxjs/array/src/lib/union.ts`:

| Tag | Usage |
|-----|--------|
| `@packageDocumentation` / `@module` | Top of implementation file (and barrel) |
| `@category` | TypeDoc group: Filter, Modify, Object, Query, Combinator, Conversion, Intl, etc. |
| `@typeParam` | When generics are public |
| `@param` | Link custom types with `[[TypeName]]` when defined in `types/` |
| `@remarks` | ECMAScript vs RxJS distinction, Node/browser requirements |
| `@example` | Title line, fenced `ts` block, then `Output:` line (string of emitted values) |
| `@returns` | What the Observable emits |
| `@private` / `@internal` | Utils only |

Avoid `@remarks` that document removed aliases (e.g. “Alias: padRight”).

## `createOrReturnObservable`

Operators that accept `T | Observable<T>` (or `Subscribable<T>`) should use the package’s `createOrReturnObservable` from `utils/internal.ts`:

```ts
const input$ = createOrReturnObservable(input);
return (source) => source.pipe(withLatestFrom(input$), map(...));
```

## Categories (TypeDoc / README)

Use existing package README sections where possible:

- **array**: Filter, Map Objects, Modify, Object, Query, Set, ECMAScript collection methods
- **boolean**: Create, Filter, Modify, Validation, Combinator, Query
- **number**: Create, Distribution, Filter, Formatting, Math, Parsing, Query, Conversion, Intl
- **string**: Convert, Create, Filter, Mapping, Modify, Query, Conversion, Intl, ASCII casing
- **random**: Random Numbers, Random Strings, Web Crypto

## Testing reference

### Vitest

- Config: `vitest.config.ts` at repo root; `include`: `libs/rxjs/*/src/**/*.spec.ts`
- Path aliases: `@rxjs-ninja/*` via `resolve.tsconfigPaths`
- Single package: `npx vitest run libs/rxjs/array`

### Marble spec template

```ts
import { marbles } from 'rxjs-marbles/jest';
import { myOp } from './my-op';

describe('myOp', () => {
  it(
    'should …',
    marbles((m) => {
      const input = m.hot('-a-|', { a: … });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: … });
      m.expect(input.pipe(myOp(…))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
```

### `observe` template (crypto / random)

```ts
import { observe } from 'rxjs-marbles/jest';
import { take, tap } from 'rxjs/operators';
import { mySource } from './my-source';

describe('mySource', () => {
  it('should …', observe(() =>
    mySource().pipe(
      take(5),
      tap((value) => { expect(…).toBe(…); }),
    ),
  ));
});
```

### Common marble mistakes

- Reusing one `m.hot()` for several `m.expect` calls in the same test—subscriptions interfere; use separate hots or separate `it` blocks.
- Wrong subscription: hot `-a-|` needs `^--!`, not `^-!`.

## CHANGELOG

Per package at `libs/rxjs/<pkg>/CHANGELOG.md`, [Keep a Changelog](https://keepachangelog.com/) format.

- Version header: `## [7.0.0] - YYYY-MM-DD`
- Sections: Added, Changed, Fixed, Removed
- **BREAKING** under Changed with peer/API notes
- List operators by area: **Array:**, **Map:**, **Object:** when grouping many additions

## CI and affected packages

```bash
node scripts/affected-workspaces.mjs origin/main
```

GitHub Actions: Node **24.x** (`.nvmrc`). Playwright for browser bundles: `npm run build:e2e` && `npm run test:browser`.

## Documentation build

```bash
npm run docs:prod   # typedoc.prod.json → docs/
npm run docs:dev    # faster iteration
```

`tsconfig.typedoc.json` excludes `*.spec.ts`. Hub pages: `typedoc-pages/`.

## Naming collisions

| Name | Meaning in rxjs-array |
|------|------------------------|
| `mapArray` | `Array.prototype.map` on emitted arrays |
| `filterArray` | `Array.prototype.filter` |
| RxJS `map` | Not re-exported from array package |

Boolean package exports `and`, `or`, `xor`, `nand` as operators—not JavaScript keywords at import sites when using namespace imports from the package.
