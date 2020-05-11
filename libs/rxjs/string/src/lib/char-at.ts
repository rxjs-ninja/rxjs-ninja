/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `charAt` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns the ASCII character at the passed position.
 * Based on [String.prototype.charAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)
 *
 * @param position The character position to get a character from, starts from 0
 *
 * @example
 * ```ts
 * fromString('AbCdE')
 *  .pipe(charAt(4))
 *  .subscribe(console.log) // 'E'
 * ```
 *
 * @returns String character located at the passed position
 * @category RxJS String Query
 */
export function charAt(position: number): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.charAt(position)));
}
