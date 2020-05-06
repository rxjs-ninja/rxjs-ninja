/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `charAt` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} string
 * value and returns the ASCII character at the passed position.
 * Based on [String.prototype.charAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)
 *
 * @param position The character position to return a character from
 *
 * @remarks
 * The position number passed starts from 0
 *
 * @example
 * ```ts
 * from(['AbCdE'])
 *  .pipe(charAt(4))
 *  .subscribe(....) // ['E']
 * ```
 *
 * @returns The character located at the passed position
 * @category RxJS String Query
 */
export function charAt(position: number): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.charAt(position)));
}
