# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2020-05-10

### Changed

- The current operators that begin with `from*` are being changed to `filter*` as using `from` has
  a specific context in RxJS with creating Observable values. The following operators are affected: - `fromIsFinite` to `filterIsFinite` - `fromIsInteger` to `filterIsInteger` - `fromIsSafeInteger` to `filterIsSafeInteger`
  Because of this change this release is a major bump to `2.0.0`

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
