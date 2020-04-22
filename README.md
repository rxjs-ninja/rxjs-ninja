# RxJS Primitives

This set of libraries provides some low-level operators for handling different operations with
primitive values (`string`, `number`, `boolean`, etc).

## Libraries

### rxjs-string

This library provides operators around the ECMAScript `String` methods, taking an input Observable
and returning a string or boolean output

|Method|Operator|Example|
|------|--------|-------|
|`String.prototype.toLocaleUpperCase`|`toUpperCase`| `from('hello world').pipe(toUpperCase()).subscribe(// 'HELLO WORLD')`|
|`String.prototype.toLocaleLowerCase`|`toLowerCase`| `from('HELLO WORLD').pipe(toLowerCase()).subscribe(// 'hello world')`|
|`String.prototype.trim`|`trim`| `from('  hello world  ').pipe(trim()).subscribe(// 'hello world')`|
|`String.prototype.trimLeft`|`trim`| `from('  hello world  ').pipe(trim('left')).subscribe(// 'hello world  ')`|
|`String.prototype.trimRight`|`trim`| `from('  hello world  ').pipe(trim('right')).subscribe(// '  hello world')`|
|`String.prototype.padStart`|`padString`| `from('1234').pipe(padString('start', 5)).subscribe(// ' 1234')`|
|`String.prototype.padEnd`|`padString`| `from('1234').pipe(padString('end', 5)).subscribe(// '1234 ')`|
|`String.prototype.endsWith`|`endsWith`| `from('Hello?').pipe(endsWith('?')).subscribe(// true)`|
|`String.prototype.charAt`|`charAt`| `from('Hello?').pipe(charAt(2)).subscribe(// 'e')`|
|`String.prototype.charCodeAt`|`charCodeAt`| `from('Hello?').pipe(charCodeAt(2)).subscribe(// 101)`|

### rxjs-number

This library provides operators around the ECMAScript `Number` methods, taking an input Observable
and returning a number or boolean output

|Method|Operator|Example|
|------|--------|-------|
|`Number.prototype.parseFloat`|`parseFloat`| `from('12.34').pipe(parseFloat()).subscribe(// 12.34)`|
|`Number.prototype.parseInt`|`parseInt`| `from('12.34').pipe(parseInt()).subscribe(// 12)`|

### rxjs-boolean

This library provides handy methods where you are working with booleans, it takes any Observable value
and returns results based on a boolean result

|Operator|Example|
|`firstTruthy`|from(['', '', 'test']).pipe(firstTruthy()).subscribe(// 'test')|
|`filterTruthy`|from(['test1', '', 'test2']).pipe(filterTruthy()).subscribe(// 'test1', 'test2')|
