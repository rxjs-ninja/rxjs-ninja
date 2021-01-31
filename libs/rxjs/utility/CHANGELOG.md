# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.1.1] - 2021-01-31

### Changed

- Internal improvements to `toWritableStream` and `fromWebSerial`

### Fixed

- `fromWebSerial` writer Observable now correctly accepts `Uint8Array` instead of `string`

## [5.1.0] - 2021-01-30

### Added

- `fromWebSerial` Observable that allows communication between [Web Serial](https://reillyeon.github.io/serial/) devices
  using RxJS (see [demo](https://rxjs-from-web-serial.stackblitz.io)
  and [source](https://stackblitz.com/edit/rxjs-from-web-serial))

### Fixed

- Correct export path for `length` operator

## [5.0.0] - 2021-01-26

Breaking change in side-effect operators, reverting to earlier code - when tested in isolation they did not cause issues
however when used together issues were caused.

### Added

- `takeUntilSignal` operator that provides the same interface as [takeUntil](https://rxjs.dev/api/operators/takeUntil)
  but uses an [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) as the notifier.
- `tapOnUnSubscribe` operator that is called on each source unsubscription.

### Fixed

- `tapOnFirstEmit` & `tapOnSubscribe` now correctly emit the source as the return Observable, no longer return the
  source value inside the callback function.
- `tapIf` no longer turns the source, instead source is always tapped but callback function is still only run if the
  predicate method passes

## [4.4.1] - 2021-01-26

### Fixed

- `fromEventSource` returns `ErrorEvent` instead of `error.message` which was undefined

## [4.4.0] - 2021-01-26

### Added

- `fromEventSource` Observable that emits values from a
  passed [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)

## [4.3.1] - 2021-01-25

### Fixed

- Update to internal build configuration for UMD compile `rxjs` and `rxjs/operators` now correctly set as `rxjs`
  and `rxjs.operators` for globals

### [4.3.0] - 2021-01-25

### Added

- `temperature` operator now also includes [Rankine](https://en.wikipedia.org/wiki/Rankine_scale) conversion

### Changed

- `temperature` operator accepts string or Enum parameters (strings are still fixed to supported temperature types)
- `weight` operator accepts string or Enum parameters (strings are still fixed to supported weight types)
- `length` operator accepts string or Enum parameters (strings are still fixed to supported length types)
- `temperature` & `weight` operators correctly have precision of `2` as default
- Internal refactor of new code and tests

## [4.2.0] - 2021-01-22

### Added

#### Conversion

- `length` operator that accepts `fromLength` and `toLength` properties and modifies the source number using a length
  calculation
  - Example: `length(Lengths.KILOMETERS, Lengths.MILES)` to convert a Kilometer length to Miles
- `temperature` operator that accepts `temperatureFrom` and `temperatureTo` properties and modifies the source number
  using a temperature calculation
  - Example: `temperature(Temperatures.KELVIN, Temperatures.CELSIUS)` to convert from Kelvin to Celsius
- `weight` operator that accepts `fromWeight` and `toWeight` properties and modifies the source number using a weight
  conversion
  - Example: `weight(Weights.GRAMS, Weights.KILOGRAMS)` to convert Grams to Kilograms

#### Color

- `rgbToHex` and `rgbaToHex` which converts RGB/RGBA strings to their Hex colour value
- `hexToRGBA` which converts a Hex string to RGB/RGBA

## [4.1.2] - 2021-01-21

### Changed

- Documentation updates and some minor internal cleanup due to [Typedoc](https://typedoc.org) upgrade

## [4.1.1] - 2021-01-20

### Changed

- Minor doc updates

## [4.1.0] - 2021-01-18

### Added

- `decodeJWT` operator that takes a string source that could be a JWT token, and attempts to decoded it and return the
  decoded response

## [4.0.0] - 2021-01-18

### Added

- `switchMapIf` operator that takes a predicate function, and two methods to return an Observable value based on the
  predicate being `true` or `false`.

### Changed

- `mapIfSource` renamed `mapIf`

## [3.2.1] - 2021-01-14

### Fixed

- `toWritableStream` now correctly returns the value to any operators after it and captures write errors when there is
  no active stream

## [3.2.0] - 2021-01-13

### Added

- `fromFetchWithProgress` provides a `fetch` interface that returns a number during a fetch of a file, and
  a `Uint8Array` when finished (which can be converted to binary data)

### Changed

- `fromReadableStream` calls `subscriber.complete` and not `subscriber.error` when using `AbortController` by default
  but can accept a parameter to throw as error
- `toWritableStream` internal improvements on how it handles errors.
- `toWritableStream` now accepts `WritableStreamDefaultWriter` object
- `toWritableStream` now accepts `AbordSignal` object to cancel the stream without ending the subscription
- Tests now use property ReadableStream and WritableStream polyfills instead of custom implementation

## [3.1.0] - 2021-01-12

### Added

- `fromReadableStream` takes a [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) and
  converts it into an Observable source
- `toWritableStream` operator takes a [WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream)
  and emits the value from the source Observable to it.

## [3.0.0] - 2020-12-21

### Updated

This release contains a major update to documentation and examples on [rxjs.ninja](https://rxjs.ninja) and improved test
coverage that provided various bug fixes.

### Changed

- `startWithTap` is now called `tapOnFirstEmit`

## [2.1.2] - 2020-11-22

### Changed

- Package is now published under `@rxjs-ninja/rxjs-utility` (this also includes previous version for migration
  from `@tinynodes/rxjs-utility`)
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
- `mapIf` operator that takes a predicate function, and two methods to return a value based on the predicate
  being `true` or `false`.

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

- `debounceWithQuery` - Operator that takes a string Observable, debouncing the value before passing to a callback that
  returns an Observable
- `startWithTap` - Operator that fires a callback only on the first emission from an Observable subscription
