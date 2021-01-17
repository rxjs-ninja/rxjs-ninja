# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.2.0] - 2021-01-17

Some internal refactoring, however there should be no breaking changes from `4.1.0`

### Added

- New `ArrayOrSet<T>` type for all inputs and sources in this library

### Changed

- All operators now accept the `ArrayOrSet<T>` as a source, and some also allow as a static or Observable input value
- Fixed some internals where source was not being piped first, and causing issues with error flow

## [4.1.0] - 2021-01-15

### Added

- `isEqualSet` operator that returns a boolean value if the source Array/Set contains the same content as the passed
  Array/Set

### Fixed

- Improved internals of `isSupersetOf` and `isSubsetOf`

## [4.0.0] - 2021-01-15

This release contains a few breaking changes and renaming of operators, also all operators now accept a source that is
an [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) or
[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) but will always return an
`Array` (except for specific `Set` operators that will be provided later)

### Added

- `isSubsetOf` operator that takes an `Array` or `Set` and checks if the source `Array` or `Set` is a subset of it
- `isSupersetOf` operator that takes an `Array` or `Set` and checks if the source `Array` or `Set` is a superset of it

### Changed

- All operators now accept Set where they also currently accept an Array, either as a source or as an input value
- The `difference` and `intersection` no longer accept a mapping method and only accepts an `Array` or `Set` value to
  return the pure difference between the two
- `differenceWith` has been renamed `filterDifference` and `intersectionWith` is now `filterIntersection` - both no
  longer accepts a predicate method
- Documentation updated and reorganised categories

## [3.1.0] - 2021-01-14

### Added

- `toSet` converts a source Array to `Set`
- `fromSet` converts a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) to
  Array
- `fromMap` operator converts
  a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
  into an Array
- `fromObjectEntries` operator that converts an Object to an array of tuples containing the string key, and value of
  each property
- `fromObjectKeys` operator that converts and Object into an array of string keys

## [3.0.0] - 2020-12-21

### Updated

This release contains a major update to documentation and examples on [rxjs.ninja](https://rxjs.ninja) and improved test
coverage that provided various bug fixes.

### Added

- `fill` operator that returns an Observable array of values where some or all the values have been replaced with the
  passed value.
- `findAll` operator that returns an array of values that are all truthy based on a passed function
- `findLast` operator that returns the last value from an array that is truthy for a passed predicate function
- `shuffle` operator that takes a source array and returns it shuffled randomly

### Changed

- `difference`, `filterDifference`, `intersection` and `intersectionWith` now use `concatMap` instead of `switchMap`
- `binarySearch` improvements, now returns the unsorted and sorted array
- Functions that return only truthy values (e.g. `filter*`, `find`, `every`, etc) with predicates treat `0` as truthy
  but `''` as falsy
- `sortMap` and `sort` correctly has a default sort method

## [2.2.0] - 2020-11-23

### Added

- `every` and `filterEvery` operators that take a predicate method and return if every item in the array is
  truthy. `every` returns a boolean value while `filterEvery` returns the array.
- `some` and `filterSome` operators that take a predicate method and return if one item in the array is truthy. `some`
  returns a boolean value while `filterSome` returns the array.
- `find` and `findIndex` operators that take a predicate method and return the first value or index of the value that
  matches the predicate.
- `indexOf` and `lastIndexOf` operators that take a value and return the index of the first or last instance of the
  value.
- `join` operator returns a string from a passed array items, with the seperator
- `reverse` operator that returns a reversed array

## [2.1.2] - 2020-11-22

### Changed

- Package is now published under `@rxjs-ninja/rxjs-array` (this also includes previous version for migration
  from `@tinynodes/rxjs-array`)
- Documentation updates

## [2.1.1] - 2020-11-20

### Changed

- Minor doc updates and new homepage URL

## [2.1.0] - 2020-11-19

### Fixed

- Correctly export all operators and fixed issues with Angular imports

### Added

- `flipArray` operator that takes an array of boolean value and flips them and returns the array
- `sort` operator that takes an array and returns it sorted, by default it will use a basic equality check on the array,
  but a function can be passed for more complex objects and arrays
- `sortMap` operator that sorts the array and then allows the contents to be mapped

## [2.0.0] - 2020-11-17

### Changed

- Updated to Typescript 4
- Documentation, test and code improvements

## [1.0.2] - 2020-05-25

### Changed

- Use `isObservable` from `rxjs` instead of `instanceof Observable`

## [1.0.1] - 2020-05-24

### Changed

- Minor documentation improvements

## [1.0.0] - 2020-05-23

### Added

- `binarySearch` operator that provides a way to search for a value within an Observable array
- `difference` operator that returns the difference between two arrays with optional modifier method
- `filterDifference` operator that returns the difference between two arrays with optional predicate method
- `intersects` operator that returns the intersection between two arrays with optional modifier method
- `filterIntersects` operator that returns the intersection between two arrays with optional predicate method
