# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.2] - 2020-11-22

### Changed

- Package is now published under `@rxjs-ninja/rxjs-utility` (this also includes previous version for migration from `@tinynodes/rxjs-utility`)
- Documentation updates

## [2.1.1] - 2020-11-20

### Changed

- Minor doc updates and new homepage URL

## [2.1.0] - 2020-11-19

### Fixed

- Correctly export all operators and fixed issues with Angular imports

## [2.0.0] - 2020-11-17

### Changed

- Updated to Typescript 4
- Documentation, test and code improvements

### Added

- `tapIf` operator that fires a callback only when the predicate function is `true`
- `mapIfSource` operator that takes a predicate function, and two methods to return a value based on the predicate being `true` or `false`.

## [1.3.1] - 2020-05-24

### Changed

- Minor improvement of test coverage

## [1.3.0] - 2020-05-23

### Added

- `tapOnSubscribe` operator that fires a callback every time a subscription to an `Observable` is made

## [1.2.0] - 2020-05-18

### Changed

- Underlying typescript library for library changed from `es2018` to `es2020`

## [1.1.0] - 2020-05-11

### Changed

- Documentation updates

## [1.0.2] - 2020-05-06

### Changed

- Documentation improvements

## [1.0.1] - 2020-05-06

Initial release of library

### Added

- `debounceWithQuery` - Operator that takes a string Observable, debouncing the value before passing to a callback that returns an Observable
- `startWithTap` - Operator that fires a callback only on the first emission from an Observable subscription
