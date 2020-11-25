/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterIncludes` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a string value if the string contains the includes parameter
 *
 * @param searchStr The value to check the string includes
 *
 * @remarks
 * Based on [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
 * If you need to get the boolean quality instead of value use [[includes]]
 *
 * @example
 * ```ts
 * from(['test', 'foobar', 'testing'])
 *  .pipe(filterIncludes('test'))
 *  subscribe(); // ['test', 'testing']
 * ```
 *
 * @returns String that passes the equality check of [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
 * @category RxJS String Filter
 */
export function filterIncludes(searchStr: string): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(filter((value) => value.includes(searchStr)));
}
