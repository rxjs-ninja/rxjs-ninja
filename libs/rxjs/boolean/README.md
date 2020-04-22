# RxJS Primitives - Boolean Operators

This library is for [RxJS Primitives](https://github.com/tanepiper/rxjs-primitives) and
provides some convenience operators for [RxJS](https://rxjs-dev.firebaseapp.com/) around
filtering values from Observables using boolean logic

## Status

This library is currently in development. Please be aware APIs may change and there are missing features.

## How to install

In your project run `npm install @tinynodes/rxjs-boolean`

To include in your project you can import the operators to include in any RxJS `pipe`

| Operator       | Example                                                                            |
| -------------- | ---------------------------------------------------------------------------------- |
| `firstTruthy`  | `from(['', '', 'test']).pipe(firstTruthy()).subscribe(// 'test')`                  |
| `filterTruthy` | `from(['test1', '', 'test2']).pipe(filterTruthy()).subscribe(// 'test1', 'test2')` |
