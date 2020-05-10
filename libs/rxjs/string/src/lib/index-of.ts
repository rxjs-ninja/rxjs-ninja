/**
 * @packageDocumentation
 * @module string
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `indexOf` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns the index number of the string passed, with optional start index
 *
 * @param searchStr The value to search for in the string
 * @param start Optional start position from 0 being the beginning of the string
 *
 * @remarks
 * Based on [String.prototype.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)
 *
 * @example
 * ```ts
 * from(['test'])
 *  .pipe(indexOf('s'))
 *  .subscribe(....) // [2]
 * ```
 *
 * @returns Index of the location where the string starts
 * @category RxJS String Query
 */
export function indexOf(searchStr: string, start?: number): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => value.indexOf(searchStr, start)));
}
