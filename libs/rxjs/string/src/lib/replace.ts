/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `replace` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a string with the text replaced via the passed pattern
 *
 * This operator is based on [String.prototype.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
 *
 * @param pattern A string to find in the Observable string to replace
 * @param replacement The replacement string
 *
 * @example
 * ```ts
 * fromString('Mary had a little lamb')
 *  .pipe(replace('lamb', 'dog'))
 *  .subscribe(console.log) // ['Mary had a little dog']
 * ```
 *
 * @example
 * ```ts
 * fromString('You get a car, you get a car, YOU GET A CAR')
 *  .pipe(replace(/\b(\w*car\w*)\b/g, 'bee'))
 *  .subscribe(console.log) // 'You get a bee, you get a bee, YOU GET A CAR'
 * ```
 *
 * @returns String with text replaced based on pattern and replacement string
 * @category RxJS String Formatting
 */
export function replace(pattern: string | RegExp, replacement: string): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => value.replace(pattern, replacement)));
}
