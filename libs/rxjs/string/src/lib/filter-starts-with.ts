/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterStartsWith` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a string value if the string of length starts with the passed character using
 * [String.prototype.startsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
 *
 * * If you need to get the boolean value instead of value use [[startsWith]]
 *
 * @param character The character to check the string starts with
 *
 * @example
 * ```ts
 * fromString(['test', 'testing', 'foobar'])
 *  .pipe(filterStartsWith('t'))
 *  .subscribe(console.log) // ['test', 'testing']
 * ```
 *
 * @returns String that passes the equality check of [String.prototype.startsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
 * @category RxJS String Filter
 */
function filterStartsWith(character: string): MonoTypeOperatorFunction<string>;
/**
 * @param character The character to check the string starts with
 * @param length Optional length of the string to check
 *
 * @example
 * ```ts
 * fromString(['test', 'testing', 'amazing'])
 *  .pipe(filterStartsWith('i', 4))
 *  .subscribe(console.log) // ['testing', 'amazing']
 * ```
 *
 * @returns String that passes the equality check of [String.prototype.startsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
 * @category RxJS String Filter
 */
function filterStartsWith(character: string, length: number): MonoTypeOperatorFunction<string>;
function filterStartsWith(character: string, length?: number): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(filter((value) => value.startsWith(character, length)));
}

export { filterStartsWith };
