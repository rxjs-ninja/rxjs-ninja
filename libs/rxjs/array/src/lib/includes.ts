/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable boolean indicating whether the source Array or Set contains the search value using
 * Array.prototype.includes.
 *
 * @category Query
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param search Value to search for in the source
 * @param fromIndex Optional index to begin searching from
 *
 * @example
 * Returns whether the source array includes a value
 * ```ts
 * const input = ['a', 'b', 'c'];
 * of(input).pipe(includes('b')).subscribe();
 * ```
 * Output: `true`
 *
 * @returns An Observable that emits whether the source includes the search value
 */
export function includes<T extends unknown>(
  search: Subscribable<T> | T,
  fromIndex?: Subscribable<number> | number,
): OperatorFunction<Iterable<T>, boolean> {
  const search$ = createOrReturnObservable(search);
  if (fromIndex === undefined) {
    return (source) =>
      source.pipe(
        withLatestFrom(search$),
        map(([value, searchValue]) => [...value].includes(searchValue)),
      );
  }
  const fromIndex$ = createOrReturnObservable(fromIndex);
  return (source) =>
    source.pipe(
      withLatestFrom(search$, fromIndex$),
      map(([value, searchValue, fromIndexValue]) => [...value].includes(searchValue, fromIndexValue)),
    );
}
