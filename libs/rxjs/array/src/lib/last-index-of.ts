/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapFn } from '../types/generic-methods';

/**
 * Returns an Observable number or Observable array of numbers containing the last index of the input value or array of values.
 *
 * Optionally a start index can be passed for the array and a map function to convert the array value for comparison
 * (for example upper/lower case)
 *
 * @param input A single value or array of values to get the last index of in the source array
 * @param fromIndex The last index in the array to search to
 * @param mapFn Optional [[MapFn]] that can be used to make comparison easier (such as lower casing text)
 *
 * @example
 * ```ts
 * const input = ['RxJS', 'Ninja', 'RxJS', 'Rocks'];
 * of(input).pipe(lastIndexOf('RxJS')).subscribe()
 * // 2
 * ```
 *
 * @example
 * ```ts
 * const input = ['RxJS', 'Ninja', 'RxJS', 'Rocks'];
 * of(input).pipe(lastIndexOf(['RxJS', 'Ninja'])).subscribe()
 * // [2, 1]
 * ```
 *
 * @example
 * ```ts
 * const input = ['RxJS', 'Ninja', 'RxJS', 'Rocks'];
 * of(input).pipe(lastIndexOf('RxJS', 1)).subscribe()
 * // 0
 * ```
 *
 * @example
 * ```ts
 * const input = ['RxJS', 'Ninja', 'RxJS', 'Rocks'];
 * of(input).pipe(lastIndexOf('ninja', input.length - 1, v => v.toLowerCase())).subscribe()
 * // 1
 * ```
 *
 * @returns Observable number or Observable array of the last index of the input item in the array
 * @category RxJS Array Query
 */
export function lastIndexOf<T extends unknown>(
  input: T | T[],
  fromIndex?: number,
  mapFn?: MapFn<T>,
): OperatorFunction<T[], number | number[]> {
  return (source) =>
    source.pipe(
      map((value) => {
        fromIndex = fromIndex || value.length - 1;
        return Array.isArray(input)
          ? (input.map((inputVal) =>
              mapFn ? value.map(mapFn).lastIndexOf(inputVal, fromIndex) : value.lastIndexOf(inputVal, fromIndex),
            ) as number[])
          : mapFn
          ? value.map(mapFn).lastIndexOf(input, fromIndex)
          : (value.lastIndexOf(input, fromIndex) as number);
      }),
    );
}
