# RxJS Ninja - Strings

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png)

[![rxjs-string](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-string?label=@rxjs-ninja/rxjs-string)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-string)

[Website](https://rxjs.ninja)
|
[Full API](https://rxjs.ninja/modules/string.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/string/CHANGELOG.md)

`@rxjs-ninja/rxjs-string` provides operators for querying, filtering and modifying string values, and Observable for generating string emitters.

For example, you can use the `fromString` to generate a sequence of strings and check they include
a string using `include`. We can also `titlize` strings.

```ts
import { fromString, includes, titleize } from '@rxjs-ninja/rxjs-string';

const inputObs$ = fromNumber(['full power', 'half power', 'quarter power']);

inputObs$.pipe(includes('half')).subscribe(); // false, true, false
inputObs$.pipe(titleize()).subscribe(); // Full Power, Half Power, Quarter Power
```
