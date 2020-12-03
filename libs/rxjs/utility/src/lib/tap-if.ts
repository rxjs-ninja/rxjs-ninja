/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { CallbackFn, PredicateFn } from '../types/utility';
import { switchMap, take, tap } from 'rxjs/operators';

/**
 * Perform a side effect for every emit from the source Observable that passes the [[PredicateFn]], return an Observable
 * that is identical to the source.
 *
 * @typeParam T The value type of the [Observable](https://rxjs.dev/api/index/class/Observable)
 *
 * @param predicate Function that provides an equality a boolean result for the passed value
 * @param callback The callback to be executed when this operator is run
 *
 * @example
 * ```ts
 * const predicateFn = (value: number) => value % 2 === 0;
 * const callbackFn = (value: number) => `${value} has a remainder of 0 for modulus 2`)
 *
 * const input = [1, 2, 3, 4, 5, 6];
 * fromArray(input).pipe(tapIf(predicateFn, callbackFn).subscribe();
 * // ...2...4...6
 * ```
 *
 * @returns Observable that emits the source observable after performing a side effect
 * @category RxJS Observable Utilities
 */
export function tapIf<T extends unknown>(
  predicate: PredicateFn<T>,
  callback: CallbackFn<T>,
): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) =>
    source.pipe(
      tap((value) => predicate(value) && callback(value)),
      switchMap(() => source),
    );
}
