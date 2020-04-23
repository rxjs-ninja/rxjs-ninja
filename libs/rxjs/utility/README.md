# RxJS Primitives - Utility Libraru

This library is for [RxJS Primitives](https://github.com/tanepiper/rxjs-primitives) and
provides some convenience operators for [RxJS](https://rxjs-dev.firebaseapp.com/) that provide some useful features.

## Status

This library is currently in development. Please be aware APIs may change and there are missing features.

## How to install

In your project run `npm install @tinynodes/rxjs-boolean`

To include in your project you can import the operators to include in any RxJS `pipe`

| Operator            | Example                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `startWithTap`      | `form.valueChange.pipe(startWithTap(() => this.touch())).subscribe()`                                                 |
| `debounceWithQuery` | `searchSource.pipe(debouceWithQuery(1000, (search: string) => this.http.get('/query?search=${search}'))).subscribe()` |
