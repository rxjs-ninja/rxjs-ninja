/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `reverse` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a string that is reversed
 *
 * @example
 * ```ts
 * fromString('emordnilaP')
 *  .pipe(reverse())
 *  .subscribe() // 'Palindrome'
 * ```
 *
 * @returns String that is reversed
 * @category String Formatting
 */
export function reverse(): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => [...value].reverse().join('')));
}
