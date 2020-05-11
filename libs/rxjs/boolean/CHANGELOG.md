# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2020-05-11

## Changed

- Improved `firstTruthy` operator to now not handle an error state but use `take(1)`

## [1.0.2] - 2020-05-06

### Changed

- Documentation improvements

## [1.0.1] - 2020-05-06

Initial Release of the rxjs-boolean library

### Added

- `filterTruthy` - Operator for returning truthy values from an `Observable` value
- `firstTruthy` - Operator for returning the first truthy value from an `Observable` value
