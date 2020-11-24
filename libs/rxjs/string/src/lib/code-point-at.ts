/**
 * @packageDocumentation
 * @module String
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `codePointAt` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns the code point of a character at the passed position.
 * Based on [String.prototype.codePointAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)
 *
 * @param position The character position to get a code point from, starts from 0
 *
 * @example
 * ```ts
 * fromString(['☃★♲'])
 *  .pipe(codePointAt(1))
 *  .subscribe(console.log) // 9733
 * ```
 *
 * @returns Number of the code point from the passed string position
 * @category RxJS String Query
 */
export function codePointAt(position: number): OperatorFunction<string, number | undefined> {
  return (source: Observable<string>) => source.pipe(map((value) => value.codePointAt(position)));
}
