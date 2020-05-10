# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2020-05-10

### Changed

- The current operators that begin with `from*` are being changed to `filter*` or `map*` as using `from` has a specific context in RxJS with creating Observable values.

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
- `concat` - Returns a string of the original `Observable<string>` concatenated with additional string passed as parameters
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
- `padString` - Returns a padded string, padded from `'start'` or `'end'` to a specified length and optional pad character
- `replace` - Returns a `String` where the original `Observable<string>` is modified with a regex or string search string, and replacement character or string
- `substring` - Returns a substring `String` of the original `Observable<string>` to the specified start position and length
- `toLowerCase` - Returns a localised lower-case `String` of the original `Observable<string>` value
- `toUpperCase` - Returns a localised upper-case `String` of the original `Observable<string>` value
- `trimString` - Returns a `String` value that has white space trimmed from the original `Observable<string>` - can be `'start'`, `'end'` or `'all'`
