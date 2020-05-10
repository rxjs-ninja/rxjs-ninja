/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `slice` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns a substring of the original string
 *
 * @param startIndex The start index for the substring
 * @param endIndex Optional end index for the length of substring
 *
 * @remarks
 * This operator is based on [String.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
 *
 * @example
 * ```ts
 * from(['Mary had a little lamb'])
 *  .pipe(slice(0, 4))
 *  .subscribe(....) // ['Mary']
 * ```
 *
 * @returns A substring of the original string value
 * @category RxJS String Creation
 */
export function slice(startIndex: number, endIndex?: number): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.slice(startIndex, endIndex)));
}
