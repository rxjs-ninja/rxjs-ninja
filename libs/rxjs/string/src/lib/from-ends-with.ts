/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `fromEndsWith` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} string
 * value and returns a string value if the string of length ends with the passed character
 *
 * @param character The character to check the string ends with
 * @param length Optional length of the string from 0 to check
 *
 * @remarks
 * Based on [String.prototype.endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
 * If no length is passed then is uses the length of the passed string
 * If you need to get the boolean quality instead of value use [[endsWith]]
 *
 * @example
 * ```ts
 * from(['test', 'testing'])
 *  .pipe(fromEndsWith('g'))
 *  .subscribe(....) // ['testing']
 * ```
 *
 * @returns String that passes the equality check of [String.prototype.endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
 * @category RxJS From String Query
 */
export function fromEndsWith(character: string, length?: number): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(filter((value) => value.endsWith(character, length)));
}
