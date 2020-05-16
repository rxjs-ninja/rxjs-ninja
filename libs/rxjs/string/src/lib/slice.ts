/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `slice` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns a substring of the original string.
 *
 * This operator is based on [String.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
 *
 * @param startIndex The start index for the substring
 *
 * @example
 * ```ts
 * fromString('Mary had a little lamb')
 *  .pipe(slice(0, 4))
 *  .subscribe(console.log) // 'Mary'
 * ```
 *
 * @returns String that is a substring of the original string value
 * @category RxJS String Creation
 */
function slice(startIndex: number): MonoTypeOperatorFunction<string>;
/**
 *
 * @param startIndex The start index for the substring
 * @param endIndex Optional end index for the length of substring
 *
 * @example
 * ```ts
 * fromString('Mary had a little lamb')
 *  .pipe(slice(11, 17))
 *  .subscribe(console.log) // 'little'
 * ```
 *
 * @returns String that is a substring of the original string value
 * @category RxJS String Creation
 */
function slice(startIndex: number, endIndex: number): MonoTypeOperatorFunction<string>;
function slice(startIndex: number, endIndex?: number): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.slice(startIndex, endIndex)));
}

export { slice };
