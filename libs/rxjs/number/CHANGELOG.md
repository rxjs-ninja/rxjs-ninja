# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Fixed

- Correctly export all operators and fixed issues with Angular imports

### Added

- `fromFiboanacci` operator, generates a sequence of Fibonacci numbers, optionally can be passed a delay property to use as a timer, otherwise
  it emits them immediately.

## [3.0.0] - 2020-11-17

### Changed

- Updated to Typescript 4
- Documentation, test and code improvements

## [2.3.1] - 2020-05-24

### Changed

- Minor improvement of test coverage

## [2.3.0] - 2020-05-18

### Changed

- Underlying typescript library for library changed from `es2018` to `es2020`

## [2.2.1] - 2020-05-16

### Changed

- Minor test changes

### [2.2.0] - 2020-05-12

### Added

- `inRange` and `filterInRange` operators for working with numbers within a `min`/`max` range
- `outOfRange` and `filterOutOfRange` operators for working with numbers outside a `min`/`max` range

### Changed

- Some functions are now using function overloading for documentation
- Various other documentation improvements

### [2.1.0] - 2020-05-11

## Added

- `isNotNaN` operator to return if a value is not a `NaN` value
- `filterIsNotNaN` - Returns the value that is not a NaN

### Changed

- `fromNumber` now accepts both a single number value, or an array of number values. When passing an array
  it acts the same as the [from](https://rxjs.dev/api/index/function/from) operator and also accept a scheduler.
- Tests refactored and improved
- Improved documentation

## [2.0.0] - 2020-05-10

### Changed

- The current operators that begin with `from*` are being changed to `filter*` as using `from` has a specific context in RxJS with creating Observable values.

The following operators are affected:

- `fromIsFinite` to `filterIsFinite`
- `fromIsInteger` to `filterIsInteger`
- `fromIsSafeInteger` to `filterIsSafeInteger`

### Added

- `fromNumber` - Creates an Observable number from a passed number parameter

## [1.0.3] - 2020-05-06

### Changed

- Documentation improvements

## [1.0.2] - 2020-05-06

Initial Release of the rxjs-number library

### Added

- `filterIsFinite` - Returns a number value from an Observable number if the `Number.isFinite` equality check it true
- `fromIsInteger` - Returns a number value from an Observable number if the `Number.isInteger` equality check it true
- `fromIsSafeInteger` - Returns a number value from an Observable number if the `Number.isSafeInteger` equality check it true
- `isFinite` - Returns a boolean value from an Observable number `Number.isFinite` equality check
- `isInteger` - Returns a boolean value from an Observable number `Number.isInteger` equality check
- `isNaN` - Returns a boolean value from an Observable number `Number.isNaN` equality check
- `isSafeInteger` - Returns a boolean value from an Observable number `Number.isSafeInteger` equality check
- `parseFloat` - Returns a number value from an Observable string
- `parseInt` - Returns a number value from an Observable string, with optional radix
- `toExponential` - Returns a string value from an Observable number raised to an exponential value
- `toLocaleString` - Returns a string value from an Observable number based on a locale formatting option
- `toPrecision` - Returns a string value from an Observable number based to the passed precision value
- `toString` - Returns a string value from an Observable number, with optional radix
