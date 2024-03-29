# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.1.3] - 2021-02-02

### Fixed

- Fixed export paths that were pointing to the export location from the repo root, not the library root

## [5.1.2] - 2021-01-25

### Fixed

- Update to internal build configuration for UMD compile `rxjs` and `rxjs/operators` now correctly set as `rxjs`
  and `rxjs.operators` for globals

## [5.1.0] - 2021-01-25

### Added

- `roundTo` operator that returns a fixed number value to the passed precision value
- New `Distribution` category for getting a number value from an `Iterable` source like Array or Set
  - `max` and `min` operators that returns the maximum or minimum number from an `Iterable` source
  - `mean` and `median` operators that calculate the mean/median value of an `Iterable` source, by default this will round
    to `3` places but can be passed as a property

## [5.0.1] - 2021-01-21

### Changed

- Documentation updates and some minor internal cleanup due to [Typedoc](https://typedoc.org) upgrade

## [5.0.0] - 2021-01-20

This released contains more breaking changes to the APIs in this module, detailed below. Internally the operators and
functions have been cleaned up to be more maintainable. Releases after this should be more stable.

### Added

- `isMod` operator that returns a boolean value if the source number has no remainder from the passed modulus value

### Changed

- `filterIsNotNaN` is now just `filterNaN` removing them from number source
- `fromNumber` no longer accepts arguments list or Promise value, parameter is now optional - if not passed the
  Observable will emit increasing positive number values.
- `parseFloat`, `parseInt` and `parseHex` no longer have property to filter NaN values and will return them,
  use `filterNaN` to remove these values.
- Internal improvements and documentation updates

## [4.3.0] - 2021-01-19

### Changed

- More internal improvements to operators
- All operators with inputs now accept Observable inputs

## [4.2.0] - 2021-01-17

### Changed

- All operators improved in their flow of data, now correctly pass errors
- Internal improvements
- `fromNumber` now correctly accepts `Set` and Array values for seed values

## [4.1.0] - 2021-01-03

### Added

- `toFixed` operator that returns a string from a number to fixed decimal places
- `toHex` / `parseHex` operators users to convert numbers to their hex value, and parse hex to number
- `add` operator that returns the addition of a source and input number
- `sub` operator that returns the subtraction of a source and input number
- `mul` operator that returns the multiplication of a source and input number
- `div` operator that returns the division of a source and input number, does not accept `0` and will throw an error
- `pow` operator that will raise a source Observable number by a passed value
- `mod` operator that returns the remainder of a number from a passed modulus

### Changed

- Operators that accept a number parameter can now be passed an Observable value

## [4.0.0] - 2020-12-21

### Updated

This release contains a major update to documentation and examples on [rxjs.ninja](https://rxjs-ninja.tane.dev) and improved test
coverage that provided various bug fixes.

### Changed

- `fromNumber` now accepts Observable and Promise-based values.
- `parseFloat` and `parseInt` now accepts an option to filter NaN values, by default this is set to `true`

## [3.1.2] - 2020-11-22

### Changed

- Package is now published under `@rxjs-ninja/rxjs-number` (this also includes previous version for migration
  from `@tinynodes/rxjs-number`)
- Documentation updates

## [3.1.1] - 2020-11-20

### Changed

- Minor doc updates and new homepage URL

## [3.1.0] - 2020-11-19

### Fixed

- Correctly export all operators and fixed issues with Angular imports

### Added

- `fromFiboanacci` operator, generates a sequence of Fibonacci numbers, optionally can be passed a delay property to use
  as a timer, otherwise it emits them immediately.

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

- `isNotNaN` operator to return if a value is not a NaN value
- `filterIsNotNaN` - Returns the value that is not a NaN

### Changed

- `fromNumber` now accepts both a single number value, or an array of number values. When passing an array it acts the
  same as the [from](https://rxjs.dev/api/index/function/from) operator and also accept a scheduler.
- Tests refactored and improved
- Improved documentation

## [2.0.0] - 2020-05-10

### Changed

- The current operators that begin with `from*` are being changed to `filter*` as using `from` has a specific context in
  RxJS with creating Observable values.

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
- `fromIsSafeInteger` - Returns a number value from an Observable number if the `Number.isSafeInteger` equality check it
  true
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
