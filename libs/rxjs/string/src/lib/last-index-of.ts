/**
 * @packageDocumentation
 * @module string
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `lastIndexOf` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns the index number of the string passed, with optional from index
 * Based on [String.prototype.lastIndexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf)
 *
 * @param searchStr The value to search for in the string
 * @param fromIndex The index of the last character in the string to be considered as the beginning of a match.
 *
 * @example
 * ```ts
 * fromString('foobar barfoo')
 *  .pipe(lastIndexOf('foo'))
 *  .subscribe(console.log) // 10
 * ```
 *
 * @example
 * ```ts
 * fromString('foobar barfoo')
 *  .pipe(indexOf('foo', 2))
 *  .subscribe(console.log) // 0
 * ```
 *
 * @returns Index of the location where the string starts
 * @category RxJS String Query
 */
export function lastIndexOf(searchStr: string, fromIndex?: number): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => value.lastIndexOf(searchStr, fromIndex)));
}
