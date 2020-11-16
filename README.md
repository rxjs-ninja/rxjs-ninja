# RxJS Primitives

RxJS Primitives is a set of libraries that provide operators for [RxJS](https://rxjs-dev.firebaseapp.com/).

The libraries included are below, but you can also find full [API Documentation](https://tanepiper.github.io/rxjs-primitives/) is available with examples.

This library is open source on [Github](https://github.com/tanepiper/rxjs-primitives) and available to install as an `npm` modules.

[![rxjs-array](https://img.shields.io/npm/v/@tinynodes/rxjs-array?label=rxjs-array)](https://www.npmjs.com/package/@tinynodes/rxjs-array)
[![rxjs-boolean](https://img.shields.io/npm/v/@tinynodes/rxjs-boolean?label=rxjs-boolean)](https://www.npmjs.com/package/@tinynodes/rxjs-boolean)
[![rxjs-number](https://img.shields.io/npm/v/@tinynodes/rxjs-number?label=rxjs-number)](https://www.npmjs.com/package/@tinynodes/rxjs-number)
[![rxjs-string](https://img.shields.io/npm/v/@tinynodes/rxjs-string?label=rxjs-string)](https://www.npmjs.com/package/@tinynodes/rxjs-string)
[![rxjs-utility](https://img.shields.io/npm/v/@tinynodes/rxjs-utility?label=rxjs-utility)](https://www.npmjs.com/package/@tinynodes/rxjs-utility)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tanepiper_rxjs-primitives&metric=alert_status)](https://sonarcloud.io/dashboard?id=tanepiper_rxjs-primitives)
[![Code Coverage](https://codecov.io/gh/tanepiper/rxjs-primitives/branch/master/graph/badge.svg)](https://codecov.io/gh/tanepiper/rxjs-primitives)

## What are these libraries?

This set of libraries provides some low-level operators for handling different operations with Observable values of primitive types (`string`, `number`, `boolean`, etc).

Some of these operators use methods from ECMAScript built-in objects such as `String` and `Number` and it also includes some convenience `Boolean` methods.

While most of these are one-line operators, they allow developers to avoid having to handle their own mapping or logic when it comes to some common used methods.

If you are looking for arethmetic operators (add, multiply, etc) then check out [rxmetrics](https://loreanvictor.github.io/rxmetics/)

### rxjs-array

A set of utility operators for various method for `Observable` arrays

#### Installation

> `npm install @tinynodes/rxjs-array`

#### Information

- [Documentation](https://tanepiper.github.io/rxjs-primitives/modules/array.html)
- [Changelog](https://github.com/tanepiper/rxjs-primitives/blob/master/libs/rxjs/array/CHANGELOG.md)

### rxjs-boolean

A set of utility operators for handling equality checking and boolean values from `Observable` values

#### Installation

> `npm install @tinynodes/rxjs-boolean`

#### Information

- [Documentation](https://tanepiper.github.io/rxjs-primitives/modules/boolean.html)
- [Changelog](https://github.com/tanepiper/rxjs-primitives/blob/master/libs/rxjs/boolean/CHANGELOG.md)

### rxjs-number

A set of operators for working with `Observable` number values. This collection includes operators based on
[ECMAScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).

Where are method is an equality check (e.g. `isInteger`) there is also a corresponding `fromIsInteger` that returns the value
rather than a boolean value (the only exception is `isNaN` which does not make sense to have this).

There are also operators for formatting numbers as strings such as `toLocaleString` and from strings such as `parseInt`.

#### Installation

> `npm install @tinynodes/rxjs-number`

#### Information

- [Documentation](https://tanepiper.github.io/rxjs-primitives/modules/number.html)
- [Changelog](https://github.com/tanepiper/rxjs-primitives/blob/master/libs/rxjs/number/CHANGELOG.md)

### rxjs-string

A set of operators for working with `Observable` string values. This collection includes operators based on
[ECMAScript String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

Where are method is an equality check (e.g. `endsWith`) there is also a corresponding `fromEndWith` that returns the value
rather than a boolean value.

There are also methods for querying strings, generating substrings, exploding strings or formatting.

#### Installation

> `npm install @tinynodes/rxjs-string`

#### Information

- [Documentation](https://tanepiper.github.io/rxjs-primitives/modules/string.html)
- [Changelog](https://github.com/tanepiper/rxjs-primitives/blob/master/libs/rxjs/string/CHANGELOG.md)

### rxjs-utility

A set of extra utility operators that provide some useful functionality when dealing with `Observable` values

#### Installation

> `npm install @tinynodes/rxjs-utility`

#### Information

- [Documentation](https://tanepiper.github.io/rxjs-primitives/utility/boolean.html)
- [Changelog](https://github.com/tanepiper/rxjs-primitives/blob/master/libs/rxjs/utility/CHANGELOG.md)
