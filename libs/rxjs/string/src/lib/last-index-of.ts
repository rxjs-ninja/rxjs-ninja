/**
 * @packageDocumentation
 * @module string
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `lastIndexOf` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns the last index number of the string passed, with optional start index
 *
 * @param searchStr The value to search for in the string
 * @param start Optional start position from 0 being the beginning of the string
 *
 * @remarks
 * Based on [String.prototype.lastIndexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf)
 *
 * @example
 * ```ts
 * fromSting('test')
 *  .pipe(lastIndexOf('t'))
 *  .subscribe(console.log) // 3
 * ```
 *
 * @returns Index of the location where the string starts
 * @category RxJS String Query
 */
export function lastIndexOf(searchStr: string, start?: number): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => value.lastIndexOf(searchStr, start)));
}
