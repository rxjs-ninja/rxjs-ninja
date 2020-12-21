/**
 * @packageDocumentation
 * @module String
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string from a source of character codes using String.fromCodePoint
 *
 * @category String Mapping
 *
 * @see The [[fromCodePoint]] Observable can be used to generate a string source from character codes
 *
 * @example
 * Returns a string `RxJS` from a source array of code points
 * ```ts
 * of([9731, 9733, 9842]).pipe(mapCodePoint()).subscribe()
 * ```
 * Output: `☃★♲`
 *
 * @returns Observable that emits a string from source code points
 */
export function mapCodePoint(): OperatorFunction<number | number[], string> {
  return (source: Observable<number | number[]>) =>
    source.pipe(
      map((values) => (Array.isArray(values) ? String.fromCodePoint(...values) : String.fromCodePoint(values))),
    );
}
