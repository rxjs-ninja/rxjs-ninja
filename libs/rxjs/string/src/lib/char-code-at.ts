/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits an array of numbers. The number is returned from String.charCodeAt using the passed
 * index or array of indexes.  The output is always an `Array` containing the number, or NaN.
 *
 * @category Query
 *
 * @param positions Single or list of index values to return the character at
 *
 * @example
 * Return the character code of the character at index `1`
 * ```ts
 * of('RxJS Ninja').pipe(charCodeAt(1)).subscribe();
 * ```
 * Output: `120`
 *
 * @returns Observable that emits an `Array` of number values
 */
export function charCodeAt(
  positions: Subscribable<Iterable<number> | number> | Iterable<number> | number,
): OperatorFunction<string, number[]> {
  const position$ = createOrReturnObservable(positions);
  return (source) =>
    source.pipe(
      withLatestFrom(position$),
      map(([value, inputValue]) =>
        typeof inputValue === 'number'
          ? [value.charCodeAt(inputValue)]
          : [...inputValue].map((v) => value.charCodeAt(v)),
      ),
    );
}
