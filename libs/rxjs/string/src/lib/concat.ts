/**
 * @packageDocumentation
 * @module String
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

/**
 * The `concat` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) string
 * value and returns string concatenated with one or more strings passed as arguments
 * This operator is based on [String.prototype.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat)
 *
 * @param args Additional strings as list of arguments
 *
 * @example
 * ```ts
 * // With Fixed Arguments
 * fromString('Mary')
 *  .pipe(concat(' ', 'had a little', ' ', 'lamb'))
 *  subscribe(); // 'Mary had a little lamb'
 * ```
 *
 * @example
 * ```ts
 * // With Fixed Array
 * fromString('Mary')
 *  .pipe(concat([' ', 'had a little', ' ', 'lamb']))
 *  subscribe(); // 'Mary had a little lamb'
 * ```
 *
 * @example
 * ```ts
 * // With Observable source
 * fromString('Mary')
 *  .pipe(concat(of([' ', 'had a little', ' ', 'lamb'])))
 *  subscribe(); // 'Mary had a little lamb'
 * ```
 *
 * @returns String that is a concatenation of the original string and new values
 * @category RxJS String Creation
 */
export function concat<T extends string | string[] | Observable<string | string[]>>(
  ...args: T[]
): MonoTypeOperatorFunction<string> {
  const values: unknown[] = [...args];
  if (values[0] instanceof Array) {
    return (source: Observable<string>) => source.pipe(map((value) => value.concat(...(values[0] as string[]))));
  } else if (values[0] instanceof Observable) {
    return (source: Observable<string>) =>
      (values[0] as Observable<string[]>).pipe(
        switchMap((strings: string[]) => source.pipe(map((value) => value.concat(...strings)))),
      );
  } else {
    return (source: Observable<string>) => source.pipe(map((value) => value.concat(...(values as string[]))));
  }
}
