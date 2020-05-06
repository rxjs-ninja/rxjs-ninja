/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toString` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * subscription number and returns a string based on number formatted to the passed radix value
 * [Number.prototype.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)
 *
 * @param radix The base radix to format the string to
 *
 * @example
 * ```ts
 * from([1, 2, 255]).pipe(toString(16), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(...) // ['1', '2', 'ff']
 * ```
 *
 * @returns String of the {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} number formatted to the passed radix
 * @category RxJS Number Formatting
 */
export function toString(radix = 10): OperatorFunction<number, string> {
  return (source: Observable<number>) => source.pipe(map((number) => number.toString(radix)));
}
