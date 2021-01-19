/**
 * @packageDocumentation
 * @module Array
 */
import { PredicateFn } from '../types/generic-methods';
import { OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Returns an Observable that emits an array when one of the values in the source array return truthy using Array.some
 *
 * @category Filter
 *
 * @see The [[some]] operator returns the boolean value instead of the array
 *
 * @typeParam T Item type contained in the Array/Set
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy value of array values
 *
 * @example
 * Returns a array where at least one string item in the array is truthy
 * ```ts
 * const input = [ ['', '', ''], ['', 'Hello', 'RxJS'], ['Hello', 'RxJS', 'Ninja'] ];
 * from(input).pipe(filterSome()).subscribe();
 * ```
 * Output: `['', 'Hello', 'RxJS'], ['Hello', 'RxJS', 'Ninja']`
 *
 * @example
 * Returns a array where at least string item in the array length `< 4`
 * ```ts
 * const input = [ ['', '', ''], ['', 'Foo', 'Bar'], ['Foo', 'Bar', 'Baz'] ];
 * from(input).pipe(filterEvery(v => v.length < 4)).subscribe();
 * ```
 * Output: `['', 'Foo', 'Bar'], ['Foo', 'Bar', 'Baz']`
 *
 * @example
 * Returns a array where at least one number in the array is less than `2`
 * ```ts
 * const input = [ [1, 0, 1, 0, 1, 0], [1, 0, 2, 1, 0, 2], [0, 1, 0, 1, 0, 2] ];
 * from(input).pipe(filterSome(v => v < 2)).subscribe();
 * ```
 * Output: `[1, 0, 1, 0, 1, 0], [1, 0, 2, 1, 0, 2], [0, 1, 0, 1, 0, 2]`
 *
 * @returns An Observable that emits a boolean when all values in source array return truthy with the [[PredicateFn]]
 */
export function filterSome<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<Iterable<T>, T[]> {
  return (source) =>
    source.pipe(
      map((value) => [...value]), // Filter requires value to be mapped first to an array
      filter((value) =>
        value.some((v) => {
          if (predicate && typeof v === 'number') {
            return predicate(v);
          }
          return predicate ? Boolean(v) && predicate(v) : Boolean(v);
        }),
      ),
    );
}
