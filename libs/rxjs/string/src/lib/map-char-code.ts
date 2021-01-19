/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string from a source of character codes using String.fromCharCode
 *
 * @category Mapping
 *
 * @see The [[fromCharCode]] Observable can be used to generate a string source from character codes
 *
 * @example
 * Returns a string `RxJS` from a source array of character codes
 * ```ts
 * of([82, 120, 74, 83]).pipe(mapCharCode()).subscribe()
 * ```
 * Output: `RxJS`
 *
 *
 * @returns Observable that emits a string from source character codes
 */
export function mapCharCode(): OperatorFunction<Iterable<number> | number, string> {
  return (source) =>
    source.pipe(
      map((values) => (typeof values === 'number' ? String.fromCharCode(values) : String.fromCharCode(...values))),
    );
}
