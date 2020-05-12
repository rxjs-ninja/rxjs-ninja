/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `toString` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) number.
 *
 * The operator will return a string value using
 * [Number.prototype.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)
 *
 * @example
 * ```ts
 * fromNumber(42)
 *  .pipe(toString())
 *  .subscribe(console.log) // '42'
 * ```
 *
 * @returns A number that is parsed from a string using `Number.parseInt`
 * @category RxJS Number Parsing
 */
function toString(): OperatorFunction<number, string>;
/**
 * A number can be formatted to a different base, such as base2 (boolean) or
 * base16 (hexadecimal)
 *
 * @param radix The base number to format to. Default is 10
 *
 * @example
 * ```ts
 * fromNumber(42)
 *  .pipe(toString('2'))
 *  .subscribe(console.log) // "101010"
 * ```
 *
 * @returns A number that is parsed from a string using `Number.parseInt` with radix
 * @category RxJS Number Parsing
 */
function toString(radix: number): OperatorFunction<number, string>;
function toString(radix = 10): OperatorFunction<number, string> {
  return (source: Observable<number>) => source.pipe(map((number) => number.toString(radix)));
}
export { toString };
