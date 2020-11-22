# RxJS Ninja - Utilities

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png)

[![rxjs-utility](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-utility?label=@rxjs-ninja/rxjs-utility)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-utility)

[Website](https://rxjs.ninja)
|
[Full API](https://rxjs.ninja/modules/string.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/string/CHANGELOG.md)

`@rxjs-ninja/rxjs-utility` provides operators for working with Observable values to view them, and modify them and don't
all into the other module categories.

Most operators fall into the `tap*` category:

```ts
import { fromEvent } from 'rxjs';
import { startWithTap, tapIf, tapOnSubscribe } from '@rxjs-ninja/rxjs-utility';

const inputObs$ = fromEvent(document, 'click').pipe(
  startWithTap(() => console.log('This will only fire once')),
  tapOnSubscribe(() => console.log('This will tab on every subscribe')),
  tapIf(
    (event) => event.target.id === 'some-div',
    () => console.log('This will tap if the user clicks on the target element'),
  ),
);

inputObs$.subscribe(); // This will only fire once, This will tab on every subscribe
inputObs$.subscribe(); // This will tab on every subscribe
```
