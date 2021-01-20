/**
 * @packageDocumentation
 * @module Number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a string that is the hex value of a source number
 *
 * @category Formatting
 *
 * @example Return a hex value of source number
 * ```ts
 * const input = [2, 16, 32, 75, 255];
 * from(input).pipe(toHex()).subscribe();
 * ```
 * Output: `'2', '10', '20', '4b', 'ff'`
 *
 * @returns Observable that emits the hex value of a source number
 */
export function toHex(): OperatorFunction<number, string> {
  return (source: Observable<number>) => source.pipe(map((number) => number.toString(16)));
}
