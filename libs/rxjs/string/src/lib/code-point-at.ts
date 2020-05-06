/**
 * @packageDocumentation
 * @module string
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `codePointAt` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} string
 * value and returns the code point of a character at the passed position.
 *
 * @param position The character position to return a character from
 *
 * @remarks
 * Based on [String.prototype.codePointAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)
 * The position number passed starts from 0
 *
 * @example
 * ```ts
 * from(['☃★♲'])
 *  .pipe(codePointAt(1))
 *  .subscribe(....) // [9733]
 * ```
 *
 * @returns The character located at the passed position
 * @category RxJS String Query
 */
export function codePointAt(position: number): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => value.codePointAt(position)));
}
