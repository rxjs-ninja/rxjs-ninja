# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.1] - 2020-11-22

Same version released under new NPM package name `@rxjs-ninja/rxjs-boolean`

## [2.1.1] - 2020-11-20

### Changed

- Minor doc updates and new homepage URL

## [2.1.0] - 2020-11-19

### Fixed

- Correctly export all operators and fixed issues with Angular imports

### Added

- `flip` operator simply flips a boolean value in a stream

## [2.0.0] - 2020-11-17

### Changed

- Updated to Typescript 4
- Documentation, test and code improvements
- `filterTruthy` operator now takes a predicate function
- `fromBoolean` operator now only takes boolean values and no longer creates booleans from other types

## [1.4.1] - 2020-05-24

### Changed

- Minor improvement of test coverage

## [1.4.0] - 2020-05-23

### Added

- Added `luhnCheck` operator for checking value is a valid [Luhn Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) value

### Changed

- Added second value support to `PredicateFn` type

## [1.3.0] - 2020-05-18

### Changed

- Underlying typescript library for library changed from `es2018` to `es2020`

## [1.2.1] - 2020-05-16

### Changed

- Minor test changes

## [1.2.0] - 2020-05-12

### Added

- Added `lastTruthy` operator that returns the last truthy value from an Observable, with an optional predicate function

### Changed

- `firstTruthy` operator now accepts a predicate function for filtering
- `fromBoolean` documentation improvements

## [1.1.0] - 2020-05-11

### Added

- `fromBoolean` added that accepts both a single value, or an array of values.
  By default, these values are boolean (e.g. `fromBoolean([true, false])`) however the type of this method can be overriden
  and any value converted to boolean (e.g. `fromBoolean<number>([0, 1, 0, 1, 0, 0 ,1])`)
  When passing an array it acts the same as the [from](https://rxjs.dev/api/index/function/from) operator and also accept a scheduler.

### Changed

- Improved `firstTruthy` operator to now not handle an error state but use `take(1)`

## [1.0.2] - 2020-05-06

### Changed

- Documentation improvements

## [1.0.1] - 2020-05-06

Initial Release of the rxjs-boolean library

### Added

- `filterTruthy` - Operator for returning truthy values from an `Observable` value
- `firstTruthy` - Operator for returning the first truthy value from an `Observable` value
