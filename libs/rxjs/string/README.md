# RxJS Primitives - String Operators

This library contains the [RxJS Primitives](https://github.com/tanepiper/rxjs-primitives) for
ECMAScript [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
methods.

## Status

This library is currently in development. Please be aware APIs may change and there are missing features.

## How to install

In your project run `npm install @tinynodes/rxjs-string`

To include in your project you can import the operators to include in any RxJS `pipe`

```ts
import { toUpperCase, toLowerCase } from '@tinynodes/rxjs-string';
import { BehaviorSubject } from 'rxjs';

export class TalkClass {
  $currentText = new BehaviorSubject<string>('');

  public shout(): string {
    return this.$currentText.asObservable().pipe(toUpperCase());
  }
  public whisper(): string {
    return this.$currentText.asObservable().pipe(toLowerCase());
  }
}
```

## Available Methods

| Method                                                                                                                                          | Operator      | Example                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------ |
| [String.prototype.toLocaleUpperCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase) | `toUpperCase` | `from('hello world').pipe(toUpperCase()).subscribe(// 'HELLO WORLD')`    |
| [String.prototype.toLocaleLowerCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase) | `toLowerCase` | `from('HELLO WORLD').pipe(toLowerCase()).subscribe(// 'hello world')`    |
| [String.prototype.trim](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)                           | `trim`        | `from(' hello world ').pipe(trim()).subscribe(// 'hello world')`         |
| [String.prototype.trimStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart)                 | `trim`        | `from(' hello world ').pipe(trim('start')).subscribe(// 'hello world ')` |
| [String.prototype.trimEnd](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd)                     | `trim`        | `from(' hello world ').pipe(trim('end')).subscribe(// ' hello world')`   |
| [String.prototype.padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)                   | `padString`   | `from('1234').pipe(padString('start', 5)).subscribe(// ' 1234')`         |
| [String.prototype.padEnd](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)                       | `padString`   | `from('1234').pipe(padString('end', 5)).subscribe(// '1234 ')`           |
| [String.prototype.endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)                   | `endsWith`    | `from('Hello?').pipe(endsWith('?')).subscribe(// true)`                  |
| [String.prototype.charAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)                       | `charAt`      | `from('Hello?').pipe(charAt(2)).subscribe(// 'e')`                       |
| [String.prototype.charCodeAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)               | `charCodeAt`  | `from('Hello?').pipe(charCodeAt(2)).subscribe(// 101)`                   |
