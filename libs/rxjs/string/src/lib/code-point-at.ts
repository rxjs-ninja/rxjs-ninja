/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number, the character code of a character at the passed position in a source
 * string using String.codePointAt
 *
 * @category String Query
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
export function codePointAt(position: number | ObservableInput<number>): OperatorFunction<string, number | undefined> {
  return (source) =>
    source.pipe(
      withLatestFrom((isObservable(position) ? position : of(position)) as Observable<number>),
      map<[string, number], number | undefined>(([value, inputValue]) => value.codePointAt(inputValue)),
    );
}
