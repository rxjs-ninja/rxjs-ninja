# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2020-11-19

### Fixed

- Correctly export all operators and fixed issues with Angular imports

### Added

- `flipArray` operator that takes an array of boolean value and flips them and returns the array
- `sort` operator that takes an array and returns it sorted, by default it will use a basic equality check on the array, but a function can be passed for more complex objects and arrays
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
- `differenceWith` operator that returns the difference between two arrays with optional predicate method
- `intersects` operator that returns the intersection between two arrays with optional modifier method
- `intersectsWith` operator that returns the intersection between two arrays with optional predicate method
