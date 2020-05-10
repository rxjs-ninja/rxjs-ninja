/**
 * @packageDocumentation
 * @module string
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `startsWith` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns a boolean value if the string of length starts with the passed character
 *
 * @param character The character to check the string ends with
 * @param length Optional length of the string from 0 to check
 *
 * @remarks
 * Based on [String.prototype.startsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
 * If no length is passed then is uses the length of the passed string
 * If you need to get the string value instead of boolean use [[filterStartsWith]]
 *
 * @example
 * ```ts
 * from(['test', 'testing', 'foobar'])
 *  .pipe(endsWith('t'))
 *  .subscribe(....) // [true, true, false]
 * ```
 *
 * @returns Boolean value if the string passes the equality check of [String.prototype.startsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
 * @category RxJS String Query
 */
export function startsWith(character: string, length?: number): OperatorFunction<string, boolean> {
  return (source: Observable<string>) => source.pipe(map((value) => value.startsWith(character, length)));
}
