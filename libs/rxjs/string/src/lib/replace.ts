/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `replace` operator can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string
 * value and returns a string with the text replaced via the passed pattern
 *
 * @param pattern A string or regular expression to evaluate in the string
 * @param replacement The replacement string
 *
 * @remarks
 * This operator is based on [String.prototype.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
 *
 * @example
 * ```ts
 * from(['Mary had a little lamb'])
 *  .pipe(replace('lamb', 'dog'))
 *  .subscribe(....) // ['Mary had a little dog']
 * ```
 *
 * @returns String with text replaced based on pattern and replacement string
 * @category RxJS String Formatting
 */
export function replace(pattern: string | RegExp, replacement: string): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.replace(pattern, replacement)));
}
