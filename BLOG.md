# RxJS Ninja Blog

## [2021-01-26] - First entry

Welcome to the first update of the RxJS Ninja blog - this is where you'll find more details on existing and upcoming
changes.

### Introduction

RxJS Ninja has been something [I've](https://tane.dev) been working on for the past few months - mostly starting out as
a learning exercise to scratch an itch, it's turned into a much larger collection of functions that I imagined.

The original goal was to work with your primitive data in Observable sources, like modifying, filtering and querying
strings, numbers and arrays.

As it stands it's now much more general purpose and provides more complex userland functions for things such as working
with browser streams such as [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
/ [WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream)
and [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource).

Documentation has been very important, and the library now has a custom [TypeDoc](https://typedoc.org/) theme (also
available open source) which will also continue to be improved.

User feedback is also important I'd [love to hear from you](https://github.com/rxjs-ninja/rxjs-ninja/issues) with any
comments, concerns or ideas!

### API Stability

Recently there have been a lot of API and under-the-hood changes as I've been building the library, with a few major
releases of modules.

As it stands I expect the APIs to become more stable by the end of this month - the library itself is also being used
for my own projects and as I use the code, I find bugs (turns out 99% test coverge still isn't enough 😃) or issues that
require breaking changes, or find better ways to handle the APIs.

There is one known major release today for the Utility module, reverting to earlier code for `tapOnFirstEmit`
and `tapOnSubscribe`, and simplifying `tapIf` as using them together has revealed some issues with the newer code.

All releases are semantic versioning, meaning if you're happy with the current version you shouldn't need to upgrade,
but all releases come with a full changelog to explain the changes.

### More Operators

The libraries will continue to get new operators - these tend to be release on minor version

* One major area missing are operators
  for [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) methods which will
  be added to the Number module

* Distribution operators for Arrays that return actual values rather than calculated ones, and can work with
  non-numerical values

* More string operators for operations such as `camelCase`, `snakeCase` and `kebabCase`

* I'm considering a `rxjs-node` module which will provide similar stream interop functions as the Utility module, but
  for the NodeJS API.

### RxJS 7

Soon RxJS will be releasing version `7.0.0` - currently in
beta ([Changelog](https://github.com/ReactiveX/rxjs/blob/master/CHANGELOG.md)) - initial tests with upgrading have not
been successful but are most likely due to the testing libraries for Jest not yet being updated.

In the worst-case scenario, all current tests will need to be refactored to remove these additional libraries. I'll most
likely hold off until closer to release until I begin the process of supporting 7.

At that point there will be a new release branch created to support operators that still support version 6, and new
versions of the library will support 7 going forward - all modules will receive a major bump.

