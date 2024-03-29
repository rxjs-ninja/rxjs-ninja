# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.0.2] - 2021-01-25

### Fixed

- Update to internal build configuration for UMD compile `rxjs` and `rxjs/operators` now correctly set as `rxjs`
  and `rxjs.operators` for globals

## [5.0.1] - 2021-01-21

### Changed

- Documentation updates and some minor internal cleanup due to [Typedoc](https://typedoc.org) upgrade

## [5.0.0] - 2021-01-19

Breaking changes in public API, and a lot of internal refactoring.

### Added

- `join` operator for the string module, allows string creation from Array and `Set` without
  needing `@rxjs-ninja/rxjs-array`

### Changed

- Operators `charAt`, `charCodeAt`, `codePointAt` all now return an Array value, even if a single value property is
  used (which will return an array of length 1)
- `from*` Observables and `concat` operator no longer accept arguments list or Promise values
- Fix `toLowerCase` and `toUpperCase` reading the wrong variable
- Improved `titleize`, also uses new `join` operator internally
- `split` operator now has default space separator
- `normalize` accepts Observable `FormType`
- Internal cleanup and refactoring

## [4.1.0] - 2021-01-17

### Changed

- All operators now accept Observable input values
- All operators and Observables that accepted Array values now also support `Set`
- Internal refactor of all operators

## [4.0.0] - 2020-12-21

### Updated

This release contains a major update to documentation and examples on [rxjs.ninja](https://rxjs-ninja.tane.dev) and improved test
coverage that provided various bug fixes.

### Added

- `replaceAll` operator for replacing all instances of a passed string in a source string (note: This requires node 15
  or latest browsers)

### Changed

- `padString` has been removed, `padStart`/`padLeft` and `padEnd`/`padRight` are the only API for these methods
- `trimString` has been removed, `trim`, `trimStart`/`trimLeft` and `trimEnd`/`trimRight` are now only available
- `titlize` arguments have changed, now accepts a list of words to exclude first as an array of strings. Ignores this
  for the first word or capitalised words
- `concat` now uses `concatMap` instead of `switchMap` when passed an Observable value
- `fromCharCode`, `fromCodePoint`, `fromString` and `fromUnicode` now accept Observable or Promise-like values

## [3.1.2] - 2020-11-22

### Changed

- Package is now published under `@rxjs-ninja/rxjs-string` (this also includes previous version for migration
  from `@tinynodes/rxjs-string`)
- Documentation updates

## [3.1.1] - 2020-11-20

### Changed

- Minor doc updates and new homepage URL

## [3.1.0] - 2020-11-19

### Fixed

- Correctly export all operators and fixed issues with Angular imports

## [3.0.0] - 2020-11-17

### Changed

- Updated to Typescript 4
- Documentation, test and code improvements

## [2.3.1] - 2020-05-24

### Changed

- Minor improvement of test coverage

## [2.3.0] 2020-05-23

### Changed

- `concat` operator now supports passing of Observable value as parameter

## [2.2.0] - 2020-05-18

### Added

New Operators (now [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
feature complete)

- `fromUnicode` - Creates a string of Unicode Normalization Form characters and
  uses [String.prototype.normalize](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
  to convert it to a string
- `match` and `matchAll` for matching strings or regular expressions.
  - `match` returns a single Array-like `RegExpMatchArray`
  - `matchAll` returns an array of Array-like `RegExpMatchArray`
- `repeat` - This repeats a string by the passed count number. This implementation accepts an optional separator
  character that can be used to generate strings such as CSV
- `search` - Searches a string and return the index of the result
- `padStart` and `padEnd` alias methods now added for padding
- `trimLeft` `trimRight` and `trim` alias methods now added for trimming

### Changed

- Underlying typescript library for library changed from `es2018` to `es2020`

## [2.1.2] - 2020-05-16

### Added

- Added `PadPosition` and `TrimPosition` enums

### Changed

- Improved documentation

## [2.1.1] - 2020-05-14

### Fixed

- Fix single character support in `mapCodePoint`

### Changed

- Improved documentation more

## [2.1.0] - 2020-05-10

### Changed

- `fromString` now accepts both a single string value or array of string values. When passing an array it acts the same
  as the [from](https://rxjs.dev/api/index/function/from) operator and also accept a scheduler.
- `concat` operator now accepts an argument list of strings or an array of strings
- `fromCharCode` now accepts both a single string value or array of string values, but will only return a single string
  value
- `fromCodePoint` now accepts both a single string value or array of string values, but will only return a single string
  value
- `mapCharCode` now accepts an Observable single number or array of numbers
- `mapCodePoint` now accepts an Observable single number or array of numbers
- Tests refactored and improved
- Improved documentation

## [2.0.0] - 2020-05-10

### Changed

- The current operators that begin with `from*` are being changed to `filter*` or `map*` as using `from` has a specific
  context in RxJS with creating Observable values.

The following operators are affected:

- `fromCharCode` to `mapCharCode`. For the new `fromCharCode` method, see the Added section below.
- `fromCodePoint` to `mapCodePoint`. For the new `fromCodePoint` method, see the Added section below.
- `fromEndsWith` to `filterEndsWith`
- `fromIncludes` to `filterIncludes`
- `fromStartsWith` to `filterStartsWith`

### Added

- `fromString` - Creates an Observable string from the string passed as it's parameter
- `fromCharCode` method now takes an array of numbers that are char codes and returns an Observable string value
- `fromCodePoint` method now takes an array of numbers that are char codes and returns an Observable string value

## [1.1.2] - 2020-05-07

### Added

- `titleize` - Operator for taking a string and capitalising first character of each word (title case)
- `reverse` - Operator for reversing a string

## [1.1.1] - 2020-05-06

### Changed

- Documentation improvements

## [1.1.0] - 2020-05-06

### Added

- `codePointAt` - Returns the code point at a specified index position of an `Observable<string>`
- `concat` - Returns a string of the original `Observable<string>` concatenated with additional string passed as
  parameters
- `fromCharCode` - Generates a string based on an array of character codes
- `filterCodePoint` - Generates a string based on an array of code points
- `fromStartsWith` - Returns the `String` value of a `Observable<string>` that starts with a specified character
- `lastIndexOf` - Returns a `Number` last index of a specified string in a `Observable<string>` value
- `slice`- Returns a substring `String` of the original `Observable<string>` from start index to optional end index
- `split` - Returns a `string[]` of strings spit from the original `Observable<string>` using a separator property
- `startsWith` - Returns a `Boolan` value if an `Observable<string>` starts with a specified character

## [1.0.2] - 2020-05-06

Initial release of library

### Added

- `charAt` - Returns the character at a specified index position of an `Observable<string>`
- `charCodeAt` - Returns the character code at a specified index position of an `Observable<string>`
- `endWith` - Returns a `Boolan` value if an `Observable<string>` ends with a specified character
- `fromEndsWith` - Returns the `String` value of a `Observable<string>` that ends with a specified character
- `fromIncludes` - Returns the `String` value of a `Observable<string>` that includes a specified string
- `includes` - Returns the `Boolean` value of a `Observable<string>` that includes a specified string
- `indexOf` - Returns a `Number` index of a specified string in a `Observable<string>` value
- `padString` - Returns a padded string, padded from `'start'` or `'end'` to a specified length and optional pad
  character
- `replace` - Returns a `String` where the original `Observable<string>` is modified with a regex or string search
  string, and replacement character or string
- `substring` - Returns a substring `String` of the original `Observable<string>` to the specified start position and
  length
- `toLowerCase` - Returns a localised lower-case `String` of the original `Observable<string>` value
- `toUpperCase` - Returns a localised upper-case `String` of the original `Observable<string>` value
- `trimString` - Returns a `String` value that has white space trimmed from the original `Observable<string>` - can
  be `'start'`, `'end'` or `'all'`
