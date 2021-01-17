/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits an array of results from String.matchAll
 *
 * @category Query
 *
 * @remarks This operator converts the `IterableIterator<RegExpMatchArray>` to `RegExpMatchArray[]` to avoid dealing
 *   with iterators.
 *
 * @param pattern A RegExp regular expression to match in the string
 *
 * @example
 * Returns all matching groups in the source string
 * ```ts
 * of('RxJS Ninja,Hello Ninja').pipe(matchAll(/([A-Za-z\s]*)Ninja/g).subscribe();
 * ```
 *
 * Output:`["RxJS Ninja", index: 0, input: "RxJS Ninja,Hello Ninja"], ["Hello Ninja", index: 11, input: "RxJS
 *   Ninja,Hello Ninja"]`
 *
 * @returns Observable that emits an array of RegExpMatchArray
 */
export function matchAll(pattern: RegExp | ObservableInput<RegExp>): OperatorFunction<string, RegExpMatchArray[]> {
  const pattern$ = (isObservable(pattern) ? pattern : of(pattern)) as Observable<RegExp>;
  return (source: Observable<string>) =>
    source.pipe(
      withLatestFrom(pattern$),
      map(([value, patternInput]) => [...value.matchAll(patternInput)]),
    );
}
