# RxJS Primitives - Utility Libraru

This library is for [RxJS Primitives](https://github.com/tanepiper/rxjs-primitives) and
provides some convenience operators for [RxJS](https://rxjs-dev.firebaseapp.com/) that provide some useful features.

## Status

This library is currently in development. Please be aware APIs may change and there are missing features.

## How to install

In your project run `npm install @tinynodes/rxjs-boolean`

## Operators

### `startWithTap`

The `startWithTap` operator allows a developer to do a one-time tap event on the first emission
from an Observable value.

#### Example

```
form.valueChange
  .pipe(
    startWithTap(() => this.touch()
)).subscribe()
```

### `debounceWithQuery`

The `debouceWithQuery` operator takes two required parameters the debounce `time` and a function
that takes a string and returns an Observable value.

```ts
const queryFn = (query: string) => {
  return http.get(`/search?query=${query}`)
}
stringInput.change.pipe(
  debounceWithQuery(1000, queryFn)
).pipe(value => console.log(value)) // Results from a remote query

```
