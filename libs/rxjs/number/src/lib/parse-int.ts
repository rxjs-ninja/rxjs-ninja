/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `parseInt` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * subscription string and returns a parsed integer number using
 * [Number.parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt)
 *
 * @param radix The base number to parse to
 * @default 10
 *
 * @example
 * ```ts
 * from(['1', '2.8', '3.14']).pipe(parseInt(), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // [1, 2, 3]
 * ```
 *
 * @returns Integer number from source string {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * @category RxJS Number Creation
 */
export function parseInt(radix = 10): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => Number.parseInt(value, radix)));
}
