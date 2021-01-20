/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { CallbackFn, PredicateFn } from '../types/utility';
import { switchMap } from 'rxjs/operators';

/**
 * Perform a side effect for every emit from the source Observable that passes the [[PredicateFn]], return an Observable
 * that is identical to the source.
 *
 * @category Side Effects
 *
 * @typeParam T The value type of the source
 *
 * @param predicate [[PredicateFn]] function to compared the values against
 * @param callback [[CallbackFn]] to be executed when this operator is run
 *
 * @example
 * Perform a side effect when the value is `mod2`
 * ```ts
 * const predicateFn = (value: number) => value % 2 === 0;
 * const callbackFn = (value: number) => `${value} is mod2`)
 *
 * const input = [1, 2, 3, 4, 5, 6];
 * from(input).pipe(tapIf(predicateFn, callbackFn).subscribe();
 * ```
 * Output: `'2 is mod2', '4 is mod2', '6 is mod2'`
 *
 * @returns Observable that emits the source observable after performing a side effect
 */
export function tapIf<T extends unknown>(
  predicate: PredicateFn<T>,
  callback: CallbackFn<T>,
): MonoTypeOperatorFunction<T> {
  return (source) =>
    source.pipe(
      switchMap((value) => {
        predicate(value) && callback(value);
        return source;
      }),
    );
}
