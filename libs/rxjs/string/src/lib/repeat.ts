/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `repeat` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a string that is reversed.
 *
 * This operator is based on [String.prototype.matchAll](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 *
 * @param count The number of times to repeat the string
 * @param separator Separator when concatenating strings
 *
 * @example
 * ```ts
 * fromString('foobar')
 *  .pipe(repeat(5))
 *  .subscribe(console.log) // 'foobarfoobarfoobarfoobarfoobar'
 * ```
 *
 * @example
 * ```ts
 * fromString('foobar')
 *  .pipe(repeat(5, ','))
 *  .subscribe(console.log) // 'foobar,foobar,foobar,foobar,foobar'
 * ```
 *
 * @returns String that is a repeat of the source string with a separator, repeated by the passed count
 * @category RxJS String Formatting
 */
export function repeat(count: number, separator?: string): MonoTypeOperatorFunction<string> {
  if (separator) {
    return (source: Observable<string>) =>
      source.pipe(
        map((value) => {
          const output = [];
          for (let i = 0; i < count; i++) {
            output.push(`${value}`);
          }
          return output.join(separator);
        }),
      );
  }
  return (source: Observable<string>) => source.pipe(map((value) => value.repeat(count)));
}
