/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from 'libs/rxjs/string/src/utils/internal';

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
export function matchAll(pattern: Subscribable<RegExp> | RegExp): OperatorFunction<string, RegExpMatchArray[]> {
  const pattern$ = createOrReturnObservable(pattern);
  return (source) =>
    source.pipe(
      withLatestFrom(pattern$),
      map(([value, patternInput]) => [...value.matchAll(patternInput)]),
    );
}
