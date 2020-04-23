# RxJS Primitives

This set of libraries provides some low-level [RxJS](https://rxjs-dev.firebaseapp.com/) operators for handling different operations with
Observable values of primitive types (`string`, `number`, `boolean`, etc).

These operators use methods from ECMAScript built-in objects such as `String` and `Number` and it also includes some
convenience `Boolean` methods.

These are operators allow developers to avoid having to handle their own mapping or logic

## Install Instructions

To include in your project install one or more of the libraries

> npm i @tinynodes/rxjs-string @tinynodes/rxjs-number @tinynodes/rxjs-boolean @tinynodes/rxjs-utility

## Libraries

### rxjs-string

[API Documentation](libs/rxjs/string/README.md)

This library provides operators around the ECMAScript `String` methods, taking an input Observable
and returning a string or boolean output.

### rxjs-number

[API Documentation](libs/rxjs/number/README.md)

This library provides operators around the ECMAScript `Number` methods, taking an input Observable
and returning a number or boolean output

### rxjs-boolean

[API Documentation](libs/rxjs/boolean/README.md)

This library provides handy methods where you are working with booleans, it takes any Observable value
and returns results based on a boolean result

## rxjs-utility

[API Documentation](libs/rxjs/utility/README.md)

A library that provides some additional useful operators such as `startWithTap` or `debouceWithQuery`
