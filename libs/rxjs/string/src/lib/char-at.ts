/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string character that is at the passed position in a source string using
 * String.charAt
 *
 * @category String Query
 *
 * @param position The index of the character to return in the source string
 *
 * @example
 * Return the character at index `1`
 * ```ts
 * of('RxJS Ninja').pipe(charAt(1)).subscribe();
 * ```
 * Output: `x`
 *
 * @returns Observable that emits a string character
 */
export function charAt(position: number | ObservableInput<number>): MonoTypeOperatorFunction<string> {
  const position$ = (isObservable(position) ? position : of(position)) as Observable<number>;
  return (source) =>
    source.pipe(
      withLatestFrom(position$),
      map(([value, inputValue]) => value.charAt(inputValue)),
    );
}
