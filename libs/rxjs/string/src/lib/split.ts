/**
 * @packageDocumentation
 * @module string
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `split` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns an array of strings based on the original string split on the separator
 *
 * This operator is based on [String.prototype.split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
 *
 * @param separator The character to split the string at
 *
 * @example
 * ```ts
 * fromString('Hello|World|Foo|Bar')
 *  .pipe(split('|'))
 *  .subscribe(console.log) // ['Hello', 'World', 'Foo', 'Bar']
 * ```
 *
 * @returns Array of strings based on the original string split by the separator
 * @category RxJS String to Array
 */
function split(separator: string): OperatorFunction<string, string[]>;
/**
 * @param separator The character to split the string at
 * @param limit Optional limit for the number of times to split
 *
 * @example
 * ```ts
 * fromString('Hello|World|Foo|Bar')
 *  .pipe(split('|', 2))
 *  .subscribe(console.log) // ['Hello', 'World', 'Foo|Bar']
 * ```
 *
 * @returns Array of strings based on the original string split by the separator
 * @category RxJS String to Array
 */
function split(separator: string, limit: number): OperatorFunction<string, string[]>;
function split(separator: string, limit?: number): OperatorFunction<string, string[]> {
  return (source: Observable<string>) => source.pipe(map((value) => value.split(separator, limit)));
}

export { split };
