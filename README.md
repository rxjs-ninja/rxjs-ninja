# RxJS Ninja

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/master/assets/logo.png)

RxJS Ninja is a set of libraries that provide operators for [RxJS](https://rxjs.dev).

This library is open source on [Github](https://github.com/rxjs-ninja/rxjs-ninja) and available to install as an `npm` modules.

[![rxjs-array](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-array?label=rxjs-array)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-array)
[![rxjs-boolean](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-boolean?label=rxjs-boolean)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-boolean)
[![rxjs-number](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-number?label=rxjs-number)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-number)
[![rxjs-random](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-random?label=rxjs-random)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-random)
[![rxjs-string](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-string?label=rxjs-string)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-string)
[![rxjs-utility](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-utility?label=rxjs-utility)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-utility)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tanepiper_rxjs-ninja&metric=alert_status)](https://sonarcloud.io/dashboard?id=tanepiper_rxjs-ninja)
[![Code Coverage](https://codecov.io/gh/tanepiper/rxjs-primitives/branch/master/graph/badge.svg)](https://codecov.io/gh/tanepiper/rxjs-primitives)

## What are these libraries?

This set of libraries provides some low-level operators for handling different operations with Observable values of primitive types (`string`, `number`, `boolean`, etc).

Some of these operators use methods from ECMAScript built-in objects such as `String` and `Number` and it also includes some convenience `Boolean` methods.

While most of these are one-line operators, they allow developers to avoid having to handle their own mapping or logic when it comes to some common used methods.

If you are looking for arethmetic operators (add, multiply, etc) then check out [rxmetrics](https://loreanvictor.github.io/rxmetics/)

### rxjs-array

A set of utility operators for various method for `Observable` arrays

#### Installation

> `npm install @rxjs-ninja/rxjs-array`

#### Information

- [Documentation](https://rxjs.ninja/modules/array.html)
- [Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/master/libs/rxjs/array/CHANGELOG.md)

### rxjs-boolean

A set of utility operators for handling equality checking and boolean values from `Observable` values

#### Installation

> `npm install @rxjs-ninja/rxjs-boolean`

#### Information

- [Documentation](https://rxjs.ninja/modules/boolean.html)
- [Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/master/libs/rxjs/boolean/CHANGELOG.md)

### rxjs-number

A set of operators for working with `Observable` number values. This collection includes operators based on
[ECMAScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).

Where are method is an equality check (e.g. `isInteger`) there is also a corresponding `fromIsInteger` that returns the value
rather than a boolean value (the only exception is `isNaN` which does not make sense to have this).

There are also operators for formatting numbers as strings such as `toLocaleString` and from strings such as `parseInt`.

#### Installation

> `npm install @rxjs-ninja/rxjs-number`

#### Information

- [Documentation](https://rxjs.ninja/modules/number.html)
- [Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/master/libs/rxjs/number/CHANGELOG.md)

### rxjs-random

A set of operators for generating Observable from random values.

#### Installation

> `npm install @rxjs-ninja/rxjs-random`

#### Information

- [Documentation](https://rxjs.ninja/modules/random.html)
- [Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/master/libs/rxjs/random/CHANGELOG.md)

### rxjs-string

A set of operators for working with `Observable` string values. This collection includes operators based on
[ECMAScript String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

Where are method is an equality check (e.g. `endsWith`) there is also a corresponding `fromEndWith` that returns the value
rather than a boolean value.

There are also methods for querying strings, generating substrings, exploding strings or formatting.

#### Installation

> `npm install @rxjs-ninja/rxjs-string`

#### Information

- [Documentation](https://rxjs.ninja/modules/string.html)
- [Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/master/libs/rxjs/string/CHANGELOG.md)

### rxjs-utility

A set of extra utility operators that provide some useful functionality when dealing with `Observable` values

#### Installation

> `npm install @rxjs-ninja/rxjs-utility`

#### Information

*This library was formally knows as RxJS Primitives published under the `@tinynodes` npm domain.*

- [Documentation](https://rxjs.ninja/utility/boolean.html)
- [Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/master/libs/rxjs/utility/CHANGELOG.md)
- Logo created by [DesignEvo logo maker](https://www.designevo.com/logo-maker/)
