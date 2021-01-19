/**
 * @packageDocumentation
 * @module Array
 */

import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable array of values filled with Array.fill. Using the source array length, some or all the values
 * are replaced with the `fillWith` parameter.
 *
 * @category Modify
 *
 * @param fillWith The value to fill the array with
 * @param startIndex Optional start index to fill the array from
 * @param endIndex Optional index of the item to stop filling at, the last item filled is `fillTo - 1`
 *
 * @typeParam T Item type contained in the input Array/Set
 * @typeParam K Item type container in the output Array/Set
 *
 * @example
 * Return an array with all values replaced
 * ```ts
 * const input = ['The', 'Cake', 'is', 'a', 'lie'];
 * of(input).pipe(fill('CAKE!')).subscribe();
 * ```
 * Output: `'CAKE!', 'CAKE!', 'CAKE!', 'CAKE!', 'CAKE!'`
 *
 * @example
 * Return an array where all items at and after index `2` are replaced
 * ```ts
 * const input = ['The', 'Cake', 'is', 'a', 'lie'];
 * of(input).pipe(fill('CAKE!', 2)).subscribe();
 * ```
 * Output: `'The', 'Cake', 'CAKE!', 'CAKE!', 'CAKE!'`
 *
 * @example
 * Return an array where all items at index `2`  and upto index `4` are replaced
 * ```ts
 * const input = ['The', 'Cake', 'is', 'a', 'lie'];
 * of(input).pipe(fill('CAKE!', 2, 4)).subscribe();
 * ```
 * Output: `'The', 'Cake', 'CAKE!', 'CAKE!', 'lie'`
 *
 * @returns An Observable that emits an array of values where some or all of the source array values are replaced with
 *   the `fillValue`
 */
export function fill<T extends unknown, K extends unknown>(
  fillWith: Subscribable<K> | K,
  startIndex: Subscribable<number> | number = 0,
  endIndex?: Subscribable<number> | number,
): OperatorFunction<Iterable<T>, K[]> {
  const fillWith$ = createOrReturnObservable(fillWith);
  const startIndex$ = createOrReturnObservable(startIndex);
  const endIndex$ = createOrReturnObservable(endIndex);
  return (source) =>
    source.pipe(
      withLatestFrom(fillWith$, startIndex$, endIndex$),
      map(
        ([value, fillWithValue, starIndexValue, endIndexValue]) =>
          [...value].fill(fillWithValue as never, starIndexValue, endIndexValue) as K[],
      ),
    );
}
