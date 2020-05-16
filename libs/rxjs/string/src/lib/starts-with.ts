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
 * Based on [String.prototype.startsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
 *
 * @param character The character to check the string ends with
 *
 * @remarks
 * If you need to get the string value instead of boolean use [[filterStartsWith]]
 *
 * @example
 * ```ts
 * from(['test', 'testing', 'foobar'])
 *  .pipe(endsWith('t'))
 *  .subscribe(console.log) // [true, true, false]
 * ```
 *
 * @returns Boolean value if the string passes the equality check of [String.prototype.startsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
 * @category RxJS String Query
 */
function startsWith(character: string): OperatorFunction<string, boolean>;
/**
 * @param character The character to check the string ends with
 * @param length Index to use as start of string
 *
 * @example
 * ```ts
 * from(['test', 'testing', 'toast'])
 *  .pipe(endsWith('t', 3))
 *  .subscribe(console.log) // [true, true, false]
 * ```
 *
 * @returns Boolean value if the string passes the equality check of [String.prototype.startsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
 * @category RxJS String Query
 */
function startsWith(character: string, length: number): OperatorFunction<string, boolean>;
function startsWith(character: string, length?: number): OperatorFunction<string, boolean> {
  return (source: Observable<string>) => source.pipe(map((value) => value.startsWith(character, length)));
}

export { startsWith };
