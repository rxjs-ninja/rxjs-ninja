/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a number that is the addition of the source number with input number
 *
 * @category Math
 *
 * @param num The number to add to the source value
 *
 * @example Returns a number that is the addition of source and input
 * ```ts
 * const input = [2, 3, 4, 5, 6];
 * from(input).pipe(add(3)).subscribe();
 * ```
 * Output: `5, 6, 7, 8, 9`
 *
 * @returns Observable that emits a number that is the addition of source and input
 */
export function add(num: Subscribable<number> | number): MonoTypeOperatorFunction<number> {
  const num$ = createOrReturnObservable(num);
  return (source) =>
    source.pipe(
      withLatestFrom(num$),
      map(([value, numValue]) => value + numValue),
    );
}
