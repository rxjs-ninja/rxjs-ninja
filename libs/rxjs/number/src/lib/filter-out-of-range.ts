/**
 * @packageDocumentation
 * @module Number
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits numbers, where that number falls outside the provided `min` and `max` values.
 * When filtering in range, the range numbers are excluded in the filter - to include them set `includeBounds` to
 * `true`.
 *
 * @category Filter
 *
 * @see The [[inRange]] operator returns a boolean value instead of the number
 * @see The [[filterOutOfRange]] can be used to get numbers that fall outside the `min` and `max` range
 *
 * @param min The minimum range value
 * @param max The maximum range value
 * @param includeBounds Optionally include the `min` and `max` values in the Observable
 *
 * @example
 * Returns values outside the `min` and `max` range
 * ```ts
 * const input = [-10, -2.3, 0, 1, 2, 3.14, 4.2, 10, 11, 42];
 * from(input).pipe(filterOutOfRange(0, 10)).subscribe();
 * ```
 * Output: `-10, -2.3, 11, 42`
 *
 * @example
 * Returns values outside and including the `min` and `max` range
 * ```ts
 * const input = [-10, -2.3, 0, 1, 2, 3.14, 4.2, 10, 11, 42];
 * from(input).pipe(filterOutOfRange(0, 10, true)).subscribe();
 * ```
 * Output: `-10, -2.3, 0, 10, 11, 42`
 *
 * @returns Observable that emits a number that falls outside the `min` and `max` ranges
 */
export function filterOutOfRange(
  min: ObservableInput<number> | number,
  max: ObservableInput<number> | number,
  includeBounds?: ObservableInput<boolean> | boolean,
): MonoTypeOperatorFunction<number> {
  const min$ = (isObservable(min) ? min : of(min)) as Observable<number>;
  const max$ = (isObservable(max) ? max : of(max)) as Observable<number>;
  const includeVal$ = (isObservable(includeBounds) ? includeBounds : of(includeBounds)) as Observable<boolean>;

  return (source) =>
    source.pipe(
      withLatestFrom(min$, max$, includeVal$),
      filter(([value, minInput, maxInput, includeInput]) =>
        includeInput ? value <= minInput || value >= maxInput : value < minInput || value > maxInput,
      ),
      map(([value]) => value),
    );
}
