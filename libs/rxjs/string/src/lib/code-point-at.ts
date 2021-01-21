/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits an array of numbers. The number is returned from String.codePointAt using the passed
 * index or array of indexes.  The output is always an `Array` containing the number, or NaN.
 *
 * @category Query
 *
 * @remarks By default String.codePointAt returns undefined, this operator returns NaN instead matching [[charCodeAt]]
 *
 * @param positions Single or list of index values to return the character at
 *
 * @example
 * Return the code point of the character at index `1`
 * ```ts
 * of('☃★♲').pipe(codePointAt(1)).subscribe();
 * ```
 * Output: `9733`
 *
 * @returns Observable that emits a number that is a code point
 */
export function codePointAt(
  positions: Subscribable<Iterable<number> | number> | Iterable<number> | number,
): OperatorFunction<string, number[]> {
  const position$ = createOrReturnObservable(positions);
  return (source) =>
    source.pipe(
      withLatestFrom(position$),
      map(([value, inputValue]) =>
        typeof inputValue === 'number'
          ? [value.codePointAt(inputValue) ?? NaN]
          : [...inputValue].map((v) => value.codePointAt(v) ?? NaN),
      ),
    );
}
