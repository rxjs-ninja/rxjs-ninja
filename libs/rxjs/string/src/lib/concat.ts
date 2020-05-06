/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `concat` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} string
 * value and returns string concatenated with one or more strings passed as arguments
 *
 * @param args A list of strings to concatenate with the original string source
 *
 * @remarks
 * This operator is based on [String.prototype.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat)
 *
 * @example
 * ```ts
 * from(['Mary'])
 *  .pipe(concat(' ', 'had a little', ' ', 'lamb'))
 *  .subscribe(....) // ['Mary had a little lamb']
 * ```
 *
 * @returns String that is a concatenation of the original string and new values
 * @category RxJS String Formatting
 */
export function concat(...args: string[]): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.concat(...args)));
}
