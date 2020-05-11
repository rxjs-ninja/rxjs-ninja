/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `parseInt` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string.
 *
 * The operator will attempt to convert the string value to a integer number using
 * [Number.parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt)
 *
 * ![parseInt Marble Diagram](../assets/marble/number/parseInt.svg)
 *
 * @param radix The base number to parse to
 * @default 10
 *
 * @example
 * ```ts
 * from(['1', '2.8', '3.14']).pipe(parseInt(), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(console.log) // [1, 2, 3]
 * ```
 *
 * @returns A number that is parsed from a string using `Number.parseInt
 * @category RxJS Number Creation
 */
export function parseInt(radix = 10): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => Number.parseInt(value, radix)));
}
