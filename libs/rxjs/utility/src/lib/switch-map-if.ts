/**
 * @packageDocumentation
 * @module Utility
 */
import { MapFn, PredicateFn } from '../types/utility';
import { OperatorFunction, Subscribable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/**
 * Returns an Observable that emits the value from either the `trueResult` or `falseResult` based on the result from
 * the source with a [[PredicateFn]].
 *
 * @category Mapping
 *
 * @remarks Each method can return it's own type which you should handle in later operators
 *
 * @typeParam I The type of value from the source
 * @typeParam T The type returned from the Truthy result
 * @typeParam F The type returned from the Falsy result, this type is optional and if not included the `T` type will be
 *   used
 *
 * @param predicate The method to check the value from the source Observable
 * @param trueResult The method with return value for a truthy [[PredicateFn]]
 * @param falseResult The method with return value for a falsy [[PredicateFn]]
 *
 * @example
 * Returns a FizzBuzz based on the input value
 * ```ts
 * const input = [ 12, 5, 6, 1, 3, 10 ];
 * from(input).pipe(
 *  switchMapIf<number, boolean>(
 *    (value) => value <= 6,
 *    (value) => of(true),
 *    (value) => of(false),
 *  ),
 * ).subscribe();
 * ```
 * Output: `true, false, true, false, false, true`
 *
 * @returns Observable that emits a value based on the [[PredicateFn]] result
 */
export function switchMapIf<I extends unknown, T = unknown, F = unknown>(
  predicate: PredicateFn<I>,
  trueResult: MapFn<I, Subscribable<T>>,
  falseResult: MapFn<I, Subscribable<T | F>>,
): OperatorFunction<I, T | F> {
  return (source) => source.pipe(switchMap((value: I) => (predicate(value) ? trueResult(value) : falseResult(value))));
}
