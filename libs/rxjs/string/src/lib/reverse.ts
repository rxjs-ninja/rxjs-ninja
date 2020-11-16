/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `reverse` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns a string that is reversed
 *
 * @remarks
 * This is a custom operator for this library and uses a method found on [1loc](https://1loc.dev/)
 *
 * @example
 * ```ts
 * fromString('emordnilaP')
 *  .pipe(reverse())
 *  .subscribe(console.log) // 'Palindrome'
 * ```
 *
 * @returns String that is reversed
 * @category RxJS String Formatting
 */
export function reverse(): MonoTypeOperatorFunction<string> {
  return (source: Observable<string>) => source.pipe(map((value) => [...value].reverse().join('')));
}
