/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a number, the character code of a character at the passed position in a source
 * string using String.codePointAt
 *
 * @category Query
 *
 * @remarks By default String.codePointAt returns undefined, this operator returns NaN instead matching with
 *   String.charCodeAt
 *
 * @param position The index of the character to return in the source string
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
  position: Subscribable<Iterable<number> | number> | Iterable<number> | number,
): OperatorFunction<string, number[]> {
  const position$ = createOrReturnObservable(position);
  return (source) =>
    source.pipe(
      withLatestFrom(position$),
      map(([value, inputValue]) =>
        typeof inputValue === 'number'
          ? [value.codePointAt(inputValue as number) ?? NaN]
          : [...inputValue].map((v) => value.codePointAt(v) ?? NaN),
      ),
    );
}
