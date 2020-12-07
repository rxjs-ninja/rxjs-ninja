/**
 * @packageDocumentation
 * @module Array
 */

import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapFn } from '../types/generic-methods';

/**
 * Returns an Observable number or Observable array of numbers containing the first index numbers of the input value or array of values.
 *
 * Optionally a start index can be passed for the array and a map function to convert the array value for comparison
 * (for example upper/lower case)
 *
 * @param input A single value or array of values to get the last index of in the source array
 * @param fromIndex The index to start from when searching
 * @param mapFn Optional [[MapFn]] that can be used to make comparison easier (such as lower casing text)
 *
 * @example
 * ```ts
 * const input = ['RxJS', 'Ninja', 'RxJS', 'Rocks'];
 * of(input).pipe(indexOf('RxJS')).subscribe()
 * // 0
 * ```
 *
 * @example
 * ```ts
 * const input = ['RxJS', 'Ninja', 'RxJS', 'Rocks'];
 * of(input).pipe(indexOf(['RxJS', 'Ninja'])).subscribe()
 * // [0, 1]
 * ```
 *
 * @example
 * ```ts
 * const input = ['RxJS', 'Ninja', 'RxJS', 'Rocks'];
 * of(input).pipe(indexOf('RxJS', 1)).subscribe()
 * // 2
 * ```
 *
 * @example
 * ```ts
 * const input = ['RxJS', 'Ninja', 'RxJS', 'Rocks'];
 * of(input).pipe(indexOf('ninja', 0, v => v.toLowerCase())).subscribe()
 * // 1
 * ```
 *
 * @returns Observable number or array of numbers containing the index of a found input
 * @category Array Query
 */
export function indexOf<T extends unknown>(
  input: T | T[],
  fromIndex = 0,
  mapFn?: MapFn<T>,
): OperatorFunction<T[], number | number[]> {
  return (source) =>
    source.pipe(
      map((value) =>
        Array.isArray(input)
          ? (input.map((inputVal) =>
              mapFn ? value.map(mapFn).indexOf(inputVal, fromIndex) : value.indexOf(inputVal, fromIndex),
            ) as number[])
          : mapFn
          ? value.map(mapFn).indexOf(input, fromIndex)
          : (value.indexOf(input, fromIndex) as number),
      ),
    );
}
