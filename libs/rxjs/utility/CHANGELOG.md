# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
