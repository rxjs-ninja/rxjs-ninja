/**
 * @packageDocumentation
 * @module Boolean
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PredicateFn } from '../types/boolean';

/**
 * Returns an Observable that emits only values from a source that does not pass the passed predicate
 *
 * @category Filter
 *
 * @typeParam T Type of the value from the source Observable
 *
 * @param predicate Optional [[PredicateFn]]; when omitted, emits values that are falsy under `Boolean()` conversion
 *
 * @example
 * Returns values from a source that are falsy
 * ```ts
 * const input = [0, 1, '', 'RxJS', false, true];
 * from(input).pipe(filterFalsy()).subscribe();
 * ```
 * Output: `0, '', false`
 *
 * @example
 * Returns a number value from a source where the number does not pass the predicate
 * ```ts
 * const mod2 = (num: number) => num % 2 === 0
 * const input = [0, 1, 2, 3, 4, 5, 6];
 * from(input).pipe(filterFalsy(mod2)).subscribe();
 * ```
 * Output: `1, 3, 5`
 *
 * @returns Observable that emits only falsy values, or values that don't pass the optional [[PredicateFn]]
 */
export function filterFalsy<T extends unknown>(predicate?: PredicateFn<T>): MonoTypeOperatorFunction<T> {
  return (source) =>
    source.pipe(
      filter((value) => (predicate ? !predicate(value) : !Boolean(value))),
    );
}
