# RxJS Primitives

This set of libraries provides some low-level [RxJS](https://rxjs-dev.firebaseapp.com/) operators for handling different operations with
Observable values of primitive types (`string`, `number`, `boolean`, etc).

These operators use methods from ECMAScript built-in objects such as `String` and `Number` and it also includes some
convenience `Boolean` methods.

These are operators allow developers to avoid having to handle their own mapping or logic

## Libraries

### rxjs-string

[API Documentation](libs/rxjs/string/README.md)

This library provides operators around the ECMAScript `String` methods, taking an input Observable
and returning a string or boolean output.

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

### rxjs-number

[API Documentation](libs/rxjs/number/README.md)

This library provides operators around the ECMAScript `Number` methods, taking an input Observable
and returning a number or boolean output

| Method                        | Operator     | Example                                                |
| ----------------------------- | ------------ | ------------------------------------------------------ |
| `Number.prototype.parseFloat` | `parseFloat` | `from('12.34').pipe(parseFloat()).subscribe(// 12.34)` |
| `Number.prototype.parseInt`   | `parseInt`   | `from('12.34').pipe(parseInt()).subscribe(// 12)`      |

### rxjs-boolean

[API Documentation](libs/rxjs/boolean/README.md)

This library provides handy methods where you are working with booleans, it takes any Observable value
and returns results based on a boolean result

| Operator       | Example                                                                            |
| -------------- | ---------------------------------------------------------------------------------- |
| `firstTruthy`  | `from(['', '', 'test']).pipe(firstTruthy()).subscribe(// 'test')`                  |
| `filterTruthy` | `from(['test1', '', 'test2']).pipe(filterTruthy()).subscribe(// 'test1', 'test2')` |
