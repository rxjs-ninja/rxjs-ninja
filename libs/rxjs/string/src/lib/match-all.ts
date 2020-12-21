/**
 * @packageDocumentation
 * @module String
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits an array of results from String.matchAll
 *
 * @category String Query
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
export function matchAll(pattern: RegExp): OperatorFunction<string, RegExpMatchArray[]> {
  return (source: Observable<string>) => source.pipe(map((value) => [...value.matchAll(pattern)]));
}
