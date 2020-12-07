/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Returns an Observable that emits number values from a source filtering out any `NaN` values.
 *
 * @category Number Filter
 *
 * @see The [[isNotNaN]] operator returns a boolean value instead of the number
 *
 * @example
 * Returns only valid numbers where the source may contain `NaN` values
 * ```ts
 * const input = [NaN, -2.3, 0, NaN, 2, 3.14, 4.2, NaN, 11, 42];
 * from(input).pipe(filterIsNotNaN()).subscribe()
 * ```
 * Output: `-2.3, 0, 2, 3.14, 4.2, 11, 42`
 *
 * @returns Observable that emits valid numbers and excludes `NaN` values
 */
export function filterIsNotNaN(): MonoTypeOperatorFunction<number> {
  return (source: Observable<number>) => source.pipe(filter((value) => !Number.isNaN(value)));
}
