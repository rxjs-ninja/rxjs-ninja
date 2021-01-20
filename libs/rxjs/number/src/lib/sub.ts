/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a number that is the subtraction of the source number with input number
 *
 * @category Math
 *
 * @param num The number to subtract to the source value
 *
 * @example Returns a number that is the subtract of source and input
 * ```ts
 * const input = [2, 3, 4, 5, 6];
 * from(input).pipe(sub(3)).subscribe();
 * ```
 * Output: `-1, 0, 1, 2, 3`
 *
 * @returns Observable that emits a number that is the subtraction of source and input
 */
export function sub(num: Subscribable<number> | number): MonoTypeOperatorFunction<number> {
  const input$ = createOrReturnObservable(num);
  return (source) =>
    source.pipe(
      withLatestFrom(input$),
      map(([value, inputValue]) => value - inputValue),
    );
}
