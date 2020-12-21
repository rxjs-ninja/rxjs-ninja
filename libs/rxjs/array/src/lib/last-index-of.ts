/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapFn } from '../types/generic-methods';

/**
 * Returns an Observable number or array of numbers. These are the index numbers of first truthy value in the source array
 * using Array.lastIndexOf
 *
 * @category Array Query
 *
 * @param input A value or array of values to get the index of in the source array
 * @param fromIndex Optional index to start searching from in the array
 * @param mapFn Optional [[MapFn]] that can be used to make comparison easier (such as lower casing text)
 *
 * @example
 * Returns the last index of the word `RxJS` in the array
 * ```ts
 * const input = [ ['RxJS', 'Ninja', 'RxJS' ], ['Learn', 'RxJS'], ['Foo', 'Bar'] ];
 * from(input).pipe(lastIndexOf('RxJS')).subscribe();
 * ```
 * Output: `2, 1, -1`
 *
 * @example
 * Returns an array of the last index of the words `RxJS` and `Ninja` in the array
 * ```ts
 * const input = [ ['RxJS', 'Ninja', 'RxJS' ], ['Ninja', 'Learn', 'RxJS'], ['Foo', 'Bar'] ];
 * of(input).pipe(lastIndexOf(['RxJS', 'Ninja'])).subscribe()
 * ```
 * Output: `[2, 1], [0, 2], [-1, -1]`
 *
 * @example
 * Returns the last index of the word `RxJS` in the array starting from index `1`
 * ```ts
 * const input = [ ['RxJS', 'Ninja', 'RxJS', 'Ninja', 'Ninja' ], ['Learn', 'RxJS'], ['Foo', 'Bar'] ];
 * of(input).pipe(lastIndexOf('RxJS', 1)).subscribe()
 * ```
 * Output: `2, 1, -1`
 *
 * @example
 * Returns the last index of the word `RxJS` in the array comparing with lower case
 * ```ts
 * const input = [ ['RxJS', 'Ninja', 'RxJS'], ['Learn', 'RxJS'], ['Foo', 'Bar'] ];
 * of(input).pipe(lastIndexOf('rxjs', 0, v => v.toLowerCase())).subscribe()
 * ```
 * Output: `2, 1, -1`
 *
 * @returns Observable number or array of numbers containing the index of the last found value
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
