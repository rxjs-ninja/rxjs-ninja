/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number, the character code of a character at the passed position in a source
 * string using String.charCodeAt
 *
 * @category String Query
 *
 * @param position The index of the character to return in the source string
 *
 *
 * @example
 * Return the character code of the character at index `1`
 * ```ts
 * of('RxJS Ninja').pipe(charCodeAt(1)).subscribe();
 * ```
 * Output: `120`
 *
 * @returns Observable that emits a number that is a character code
 */
export function charCodeAt(position: number | ObservableInput<number>): OperatorFunction<string, number> {
  return (source) =>
    source.pipe(
      withLatestFrom((isObservable(position) ? position : of(position)) as Observable<number>),
      map<[string, number], number>(([value, inputValue]) => value.charCodeAt(inputValue)),
    );
}
