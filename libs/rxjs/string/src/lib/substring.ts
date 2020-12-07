/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `substring` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a substring based on the passed start and end value
 *
 * This operator is based on [String.prototype.substring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)

 * @param start Index of the string where to start the substring
 * @param end Optional end index of the substring, if not passed it will use the string length
 *
 * @example
 * ```ts
 * fromString('Mary had a little lamb')
 *  .pipe(substring(12))
 *  subscribe(); // 'little lamb'
 * ```
 *
 * @example
 * ```ts
 * fromString('Mary had a little lamb')
 *  .pipe(substring(0, 4))
 *  subscribe(); // 'Mary'
 * ```
 *
 * @returns String that is a substring of the original string
 * @category String Creation
 */
export function substring(start: number, end?: number): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.substring(start, end)));
}
