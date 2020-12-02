/**
 * @packageDocumentation
 * @module Utility
 */
import { MapFn, PredicateFn } from '../types/utility';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable value from either the `trueResult` or `falseResult` [[MapFn]] based on the result of the
 * [[PredicateFn]]. Each method can return it's own type (which will need to be type checked in subsequent operators,
 *
 * @typeParam I The value type for the incoming observable source
 * @typeParam T The type returned from the Truthy result
 * @typeParam F The type returned from the Falsy result, this type is optional and if not included the `T` type will be used
 *
 * @param predicate The method to check the value from the source Observable
 * @param trueResult The method with return value for a truthy [[PredicateFn]]
 * @param falseResult The method with return value for a falsy [[PredicateFn]]
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
 * @returns Observable that emits a value from the truthy or falsy [[MapFn]] based on the [[PredicateFn]] result
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
