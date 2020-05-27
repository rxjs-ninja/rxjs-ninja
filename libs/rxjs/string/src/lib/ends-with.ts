/**
 * @packageDocumentation
 * @module string
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `endsWith` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a boolean value if the string of length ends with the passed character using
 * [String.prototype.endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
 *
 * * If you need to get the string value instead of value use [[filterEndsWith]]
 *
 * @param character The character to check the string ends with
 *
 * @example
 * ```ts
 * fromString(['test', 'testing'])
 *  .pipe(endsWith('g'))
 *  .subscribe(console.log) // [false, true]
 * ```
 *
 * @returns Boolean that passes the equality check of [String.prototype.endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
 * @category RxJS String Query
 */
function endsWith(character: string): OperatorFunction<string, boolean>;
/**
 * @param character The character to check the string ends with
 * @param length Optional length of the string to check
 *
 * @example
 * ```ts
 * fromString(['test', 'testing'])
 *  .pipe(endsWith('t', 4))
 *  .subscribe(console.log) // [true, true]
 * ```
 *
 * @returns Boolean that passes the equality check of [String.prototype.endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
 * @category RxJS String Query
 */
function endsWith(character: string, length: number): OperatorFunction<string, boolean>;
function endsWith(character: string, length?: number): OperatorFunction<string, boolean> {
  return (source: Observable<string>) => source.pipe(map((value) => value.endsWith(character, length)));
}

export { endsWith };
