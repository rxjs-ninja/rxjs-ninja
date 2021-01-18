/**
 * @packageDocumentation
 * @module Utility
 */
import { MapFn, PredicateFn } from '../types/utility';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

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
 * const input = [ 1, 2, 3, 4, 5, 6, 10, 15, 16 ];
 * from(input).pipe(
 *  mapIf<number, string, number>(
 *    (value) => value % 15 == 0 || value % 3 == 0 || value % 5 == 0,
 *    (value) => (value % 15 == 0 ? `FizzBuzz` : value % 3 === 0 ? 'Fizz' : 'Buzz'),
 *    (value) => value,
 *  ),
 * ).subscribe();
 * ```
 * Output: `1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 10, 'FizzBuzz', 16`
 *
 * @returns Observable that emits a value from the truthy or falsy [[MapFn]] based on the [[PredicateFn]] result
 */
export function mapIf<I = unknown, T = unknown, F = unknown>(
  predicate: PredicateFn<I>,
  trueResult: MapFn<I, T>,
  falseResult: MapFn<I, T | F>,
): OperatorFunction<I, T | F> {
  return (source: Observable<I>) =>
    source.pipe(map((value: I) => (predicate(value) ? trueResult(value) : falseResult(value))));
}
