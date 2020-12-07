/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterEndsWith` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a string value if the string of length ends with the passed character using
 * [String.prototype.endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
 *
 * * If you need to get the boolean value instead of value use [[endsWith]]
 *
 * @param character The character to check the string ends with
 * @param length Optional length of the string to check
 *
 * @example
 * ```ts
 * fromString(['test', 'testing'])
 *  .pipe(filterEndsWith('g'))
 *  subscribe(); // ['testing']
 * ```
 *
 * @example
 * ```ts
 * fromString(['test', 'testing'])
 *  .pipe(filterEndsWith('t', 4))
 *  subscribe(); // ['test', 'testing']
 * ```
 *
 * @returns String that passes the equality check of [String.prototype.endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
 * @category String Filter
 */
export function filterEndsWith(character: string, length?: number): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(filter((value) => value.endsWith(character, length)));
}
