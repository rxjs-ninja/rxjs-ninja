/**
 * @packageDocumentation
 * @module Utility
 */
import { MapFn, PredicateFn } from '../types/utility';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `mapIfSource` operator is used with an [Observable](https://rxjs.dev/api/index/class/Observable) value and takes a predicate
 * function. Based on the result of the predicate it will return a value based on a truthy or falsy result. Each value can be
 * cast to a specific type if required
 *
 * @typeParam I The value type for the incoming observable source
 * @typeParam T The type returned from the Truthy result
 * @typeParam F The type returned from the Falsy result, this type is optional and if not included the `T` type will be used
 *
 * @param predicate
 * @param trueResult
 * @param falseResult
 *
 * @example
 * ```ts
 * of('dog').pipe(
 *  mapIfSource<string, string>(
 *    (value) => value === 'dog',
 *    (value) => 'woof! woof!',
 *    (value) => `meow!`,
 *  ),
 * ).subscribe(); // 'woof! woof!'
 * ```
 *
 * @example
 * ```ts
 * of('42').pipe(
 *  mapIfSource<string, number, string>(
 *    (value) => value === '42',
 *    (value) => parseInt(value),
 *    (value) => `${value}: This is not the ultimate answer`,
 *  ),
 * ).subscribe(); // 42
 * ```
 *
 * @returns Any value based on the Truthy or Falsy [[MapFn]] based on the [[PredicateFn]] result
 * @category RxJS Utility Modifier
 */
export function mapIfSource<I = unknown, T = unknown, F = unknown>(
  predicate: PredicateFn<I>,
  trueResult: MapFn<I, T>,
  falseResult: MapFn<I, T | F>,
): OperatorFunction<I, T | F> {
  return (source: Observable<I>) =>
    source.pipe(map((value: I) => (predicate(value) ? trueResult(value) : falseResult(value))));
}
