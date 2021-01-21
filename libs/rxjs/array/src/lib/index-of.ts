/**
 * @packageDocumentation
 * @module Array
 */

import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { isArrayOrSet } from '../utils/array-set';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable Number if the input is a single value, or Array of numbers in the input is an Array.
 * These are the index numbers of first truthy value in the source array using Array.indexOf
 *
 * @category Query
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param input A value or array of values to get the index of in the source array
 * @param startIndex Optional index to start searching from in the array, starts from `0`
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
 * @returns Observable number or array of numbers containing the index of the first found value
 */

export function indexOf<T extends unknown>(
  input: Subscribable<Iterable<T> | T> | Iterable<T> | T,
  startIndex?: Subscribable<number> | number,
): OperatorFunction<Iterable<T>, number[]> {
  const input$ = createOrReturnObservable(input);
  const startIndex$ = createOrReturnObservable(startIndex);
  return (source) =>
    source.pipe(
      withLatestFrom(input$, startIndex$),
      map(([[...value], inputValue, startIndexValue]) => {
        return isArrayOrSet(inputValue)
          ? [...inputValue].map((val) => value.indexOf(val, startIndexValue))
          : [value.indexOf(inputValue as T, startIndexValue)];
      }),
    );
}
