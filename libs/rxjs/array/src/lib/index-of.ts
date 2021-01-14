/**
 * @packageDocumentation
 * @module Array
 */

import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable number or array of numbers. These are the index numbers of first truthy value in the source
 * array using Array.indexOf
 *
 * @category Query
 *
 * @param input A value or array of values to get the index of in the source array
 * @param fromIndex Optional index to start searching from in the array
 * @param mapFn Optional [[MapFn]] that can be used to make comparison easier (such as lower casing text)
 *
 * @example
 * Returns the first index of the word `RxJS` in the array
 * ```ts
 * const input = [ ['RxJS', 'Ninja' ], ['Learn', 'RxJS'], ['Foo', 'Bar'] ];
 * from(input).pipe(indexOf('RxJS')).subscribe();
 * ```
 * Output: `0, 1, -1`
 *
 * @example
 * Returns an array of the first index of the words `RxJS` and `Ninja` in the array
 * ```ts
 * const input = [ ['RxJS', 'Ninja' ], ['Learn', 'RxJS'], ['Foo', 'Bar'] ];
 * of(input).pipe(indexOf(['RxJS', 'Ninja'])).subscribe()
 * ```
 * Output: `[0, 1], [1, -1], [-1, -1]`
 *
 * @example
 * Returns the first index of the word `RxJS` in the array starting from index `1`
 * ```ts
 * const input = [ ['RxJS', 'Ninja' ], ['Learn', 'RxJS'], ['Foo', 'Bar'] ];
 * of(input).pipe(indexOf('RxJS', 1)).subscribe()
 * ```
 * Output: `-1, 1, -1`
 *
 * @example
 * Returns the first index of the word `RxJS` in the array comparing with lower case
 * ```ts
 * const input = [ ['RxJS', 'Ninja' ], ['Learn', 'RxJS'], ['Foo', 'Bar'] ];
 * of(input).pipe(indexOf('rxjs', 0, v => v.toLowerCase())).subscribe()
 * ```
 * Output: `0, 1, -1`
 *
 * @returns Observable number or array of numbers containing the index of the first found value
 */
export function indexOf<T extends unknown>(
  input: T | T[] | Set<T>,
  fromIndex = 0,
): OperatorFunction<T[] | Set<T>, number | number[]> {
  return (source) =>
    source.pipe(
      map(([...value]) =>
        Array.isArray(input)
          ? (input.map((inputVal) => value.indexOf(inputVal, fromIndex)) as number[])
          : (value.indexOf(input as T, fromIndex) as number),
      ),
    );
}
