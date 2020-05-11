/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toLocaleString` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return a string value of the number formatted using
 * [Number.prototype.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)
 *
 * ![toString Marble Diagram](../assets/marble/number/toString.svg)
 *
 * @remarks
 * This method takes an optional radix (base number) for format the string to
 *
 * @param radix The base radix to format the string to
 *
 * @example
 * ```ts
 * from([1, 2, 255]).pipe(toString(16), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(console.log) // ['1', '2', 'ff']
 * ```
 *
 * @returns String of the number value formatted using `Number.prototype.toString`
 * @category RxJS Number Formatting
 */
export function toString(radix = 10): OperatorFunction<number, string> {
  return (source: Observable<number>) => source.pipe(map((number) => number.toString(radix)));
}
