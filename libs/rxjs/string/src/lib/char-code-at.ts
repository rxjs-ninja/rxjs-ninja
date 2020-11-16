/**
 * @packageDocumentation
 * @module string
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `charCodeAt` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a number of the ASCII code for the character
 * Based on [String.prototype.charCodeAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)
 *
 * @param position The character position to get a character code from, starts from 0
 *
 * @example
 * ```ts
 * fromString('abcde')
 *  .pipe(charCodeAt(4))
 *  .subscribe(console.log) // 101
 * ```
 *
 * @returns Number of the character code from the passed string position
 * @category RxJS String Query
 */
export function charCodeAt(position: number): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => value.charCodeAt(position)));
}
