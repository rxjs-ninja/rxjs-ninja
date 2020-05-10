/**
 * @packageDocumentation
 * @module string
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `endsWith` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns a boolean value if the string of length ends with the passed character
 *
 * @param character The character to check the string ends with
 * @param length Optional length of the string from 0 to check
 *
 * @remarks
 * Based on [String.prototype.endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
 * If no length is passed then is uses the length of the passed string
 * If you need to get the string value instead of boolean use [[filterEndsWith]]
 *
 * @example
 * ```ts
 * from(['test', 'testing'])
 *  .pipe(endsWith('g'))
 *  .subscribe(....) // [false, true]
 * ```
 *
 * @returns Boolean value if the string passes the equality check of [String.prototype.endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
 * @category RxJS String Query
 */
export function endsWith(character: string, length?: number): OperatorFunction<string, boolean> {
  return (source: Observable<string>) => source.pipe(map((value) => value.endsWith(character, length)));
}
