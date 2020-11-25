/**
 * @packageDocumentation
 * @module Number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `parseInt` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs.dev/api/index/class/Observable) string.
 *
 * The operator will attempt to convert the string value to a integer number using
 * [Number.parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt)
 *
 * An integer can be parsed to a different base, such as base2 (boolean) or
 * base16 (hexadecimal)
 *
 * @param radix The base number to parse to with a default of 10 already set
 *
 *  * @example
 * ```ts
 * fromString(['1', '2.8', '3.14'])
 *  .pipe(parseInt())
 *  .subscribe() // [1, 2, 3]
 * ```
 *
 * @example
 * ```ts
 * fromString(['1', 'ff', '40'])
 *  .pipe(parseInt(16))
 *  .subscribe() // [1, 255, 64]
 * ```
 *
 * @returns A number that is parsed from a string using `Number.parseInt` using a radix
 * @category RxJS Number Parsing
 */
export function parseInt(radix = 10): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => Number.parseInt(value, radix)));
}
