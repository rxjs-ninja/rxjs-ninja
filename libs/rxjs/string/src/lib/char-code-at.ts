/**
 * @packageDocumentation
 * @module string
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `charCodeAt` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns a number of the ASCII code for the character
 *
 * @param position The character position to return a character code from
 *
 * @remarks
 * Based on [String.prototype.charCodeAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)
 * The position number passed starts from 0
 *
 * @example
 * ```ts
 * from(['abcde'])
 *  .pipe(charCodeAt(4))
 *  .subscribe(....) // [101]
 * ```
 *
 * @returns The character code of the character located at the passed position
 * @category RxJS String Query
 */
export function charCodeAt(position: number): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => value.charCodeAt(position)));
}
