/**
 * @packageDocumentation
 * @module String
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `includes` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a boolean value if the string includes the passed value string.
 * Based on [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
 *
 * @param searchStr The value to check if the string includes this
 *
 * @remarks
 * If you need to get the string value instead of boolean use [[filterIncludes]]
 *
 * @example
 * ```ts
 * fromString(['test', 'testing', 'foobar'])
 *  .pipe(includes('test'))
 *  subscribe(); // [true, true, false]
 * ```
 *
 * @returns Boolean value if the string passes the equality check of [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
 * @category String Query
 */
export function includes(searchStr: string): OperatorFunction<string, boolean> {
  return (source: Observable<string>) => source.pipe(map((value) => value.includes(searchStr)));
}
