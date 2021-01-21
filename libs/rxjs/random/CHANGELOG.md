# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Documentation updates and some minor internal cleanup due to [Typedoc](https://typedoc.org) upgrade

### [2.1.0] - 2021-01-18

### Added

- `fromUUIDv4` Observable that emits a random UUIDv4 with optional `emitTime`

### [2.0.1] - 2021-01-17

### Changed

- Minor internal improvements

## [2.0.0] - 2020-12-21

### Updated

This release contains a major update to documentation and examples on [rxjs.ninja](https://rxjs.ninja) and improved test
coverage that provided various bug fixes.

### Changed

- `fromRandomCrypto` now returns a random result from the array of randomly generated numbers
- `fromRandomString` now only excludes special characters from it's default settings

## [1.1.1] - 2020-11-22

### Changed

- Documentation updates

### Changed

- This package is now released under `@rxjs-ninja/rxjs-random`
- `fromRandomCrypto` now takes an additional third parameter with `FromRandomCryptoOpts` which allows
  for `1 & 2 byte` values and unsigned values.

## [1.0.1] - 2020-11-20

### Changed

- Minor doc updates and new homepage URL

## [1.0.0] - 2020-11-19

### Added

- `fromRandom` function that generates an Observable stream of random numbers between a `min` and `max` range (defaults are `0` and `1`). This method
  uses a timer an optionally can be passed a `emitTime` that will set a timer to emit, otherwise it's `0`
- `fromRandom` function that generates an Observable stream of random integer numbers between a `min` and `max` range (defaults are `0` and `100`). This method
  uses a timer an optionally can be passed a `emitTime` that will set a timer to emit, otherwise it's `0`
- `fromRandomString` function that generates an Observable stream of random strings of passed length (default is `10` characters). This method
  uses a timer an optionally can be passed a `emitTime` that will set a timer to emit, otherwise it's `0`. By default the string only contains upper and lower case
  characters, but a third option can be provided to include number and special characters.
- `fromRandomCrypto` function that generates an Observable stream of random numbers from [Crypto.getRandomValues](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) using
  it to return one value at a time. This method uses a timer an optionally can be passed a `emitTime` that will set a timer to emit, otherwise it's `0`.
