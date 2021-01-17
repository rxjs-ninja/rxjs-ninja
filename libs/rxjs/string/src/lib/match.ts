/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a `RegExpMatchArray` where a source string returns a valid result using using
 * String.match. If no result is found, `null` is emitted.
 *
 * @category String Query
 *
 * @param pattern A string or RegExp to match
 *
 * @example
 * Returns a single match for the string `RxJS` in the source string
 * ```ts
 * of('Hello RxJS Ninja, RxJS Rocks').pipe(match('RxJS')).subscribe();
 * ```
 * Output: `['RxJS', index: 6, input: 'Hello RxJS Ninja, RxJS Rocks', groups: undefined]`
 *
 * @example
 * Returns a match with a RegExp with global `/g` for `RxJS`
 * ```ts
 * of('Hello RxJS Ninja, RxJS Rocks').pipe(match(/RxJS/g)).subscribe();
 * ```
 * Output: `['RxJS', 'RxJS']`
 *
 * @returns Observable that emits a RegExpMatchArray
 */
export function match(
  pattern: string | RegExp | ObservableInput<string | RegExp>,
): OperatorFunction<string, RegExpMatchArray | null> {
  const pattern$ = (isObservable(pattern) ? pattern : of(pattern)) as Observable<string | RegExp>;
  return (source) =>
    source.pipe(
      withLatestFrom(pattern$),
      map(([value, patternInput]) => value.match(patternInput)),
    );
}
