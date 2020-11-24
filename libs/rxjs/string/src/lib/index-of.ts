/**
 * @packageDocumentation
 * @module String
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `indexOf` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns the index number of the string passed, with optional start index
 * Based on [String.prototype.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)
 *
 * @param searchStr The value to search for in the string
 * @param start Start position from 0 being the beginning of the string
 *
 * @example
 * ```ts
 * fromString('foobar barfoo')
 *  .pipe(indexOf('foo'))
 *  .subscribe(console.log) // 0
 * ```
 *
 * @example
 * ```ts
 * fromString('foobar barfoo')
 *  .pipe(indexOf('foo', 1))
 *  .subscribe(console.log) // 10
 * ```
 *
 * @returns Index of the location where the string starts
 * @category RxJS String Query
 */
export function indexOf(searchStr: string, start?: number): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => value.indexOf(searchStr, start)));
}
