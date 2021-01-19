/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits an array of strings. The string is returned from String.charAt using the passed
 * index or array of indexes.  The output is always an `Array` containing the string, or empty string if nothing found.
 *
 * @category Query
 *
 * @param positions Single or list of index values to return the character at
 *
 * @example
 * Return the character at index `1`
 * ```ts
 * of('RxJS Ninja').pipe(charAt(1)).subscribe();
 * ```
 * Output: `['x']`
 *
 * @example
 * Return the character at index `1` and `7`
 * ```ts
 * of('RxJS Ninja').pipe(charAt([1, 7])).subscribe();
 * ```
 * Output: `['x', 'n']`
 *
 * @returns Observable that emits an `Array` of string values
 */
export function charAt(
  positions: Subscribable<Iterable<number> | number> | Iterable<number> | number,
): OperatorFunction<string, string[]> {
  const position$ = createOrReturnObservable(positions);
  return (source) =>
    source.pipe(
      withLatestFrom(position$),
      map(([value, positionsValue]) =>
        typeof positionsValue === 'number'
          ? [value.charAt(positionsValue)]
          : [...positionsValue].map((v) => value.charAt(v)),
      ),
    );
}
