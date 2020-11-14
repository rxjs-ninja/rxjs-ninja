/**
 * @packageDocumentation
 * @module string
 */
import { MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
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
 * // With Arguments
 * fromString('Mary')
 *  .pipe(concat(' ', 'had a little', ' ', 'lamb'))
 *  .subscribe(console.log) // 'Mary had a little lamb'
 * ```
 *
 * @returns String that is a concatenation of the original string and new values
 * @category RxJS String Creation
 */
function concat(...args: string[]): MonoTypeOperatorFunction<string>;
/**
 * @param strings Observable array of strings
 *
 * @example
 * ```ts
 * // With Arguments
 * fromString('Mary')
 *  .pipe(concat(of([' ', 'had a little', ' ', 'lamb'])))
 *  .subscribe(console.log) // 'Mary had a little lamb'
 * ```
 *
 * @returns String that is a concatenation of the original string and new values
 * @category RxJS String Creation
 */
function concat(strings: ObservableInput<string[]>): MonoTypeOperatorFunction<string>;
/**
 * @param strings Additional strings as an array
 *
 * @example
 * ```ts
 * // With Array
 * fromString('Mary')
 *  .pipe(concat([' ', 'had a little', ' ', 'lamb']))
 *  .subscribe(console.log) // 'Mary had a little lamb'
 * ```
 */
function concat(strings: string[]): MonoTypeOperatorFunction<string>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function concat(...args: any[]): MonoTypeOperatorFunction<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const values: any[] = [...args];
  if (values[0] instanceof Array) {
    return (source: Observable<string>) => source.pipe(map((value) => value.concat(...values[0])));
  } else if (values[0] instanceof Observable) {
    return (source: Observable<string>) =>
      values[0].pipe(switchMap((strings: string[]) => source.pipe(map((value) => value.concat(...strings)))));
  } else {
    return (source: Observable<string>) => source.pipe(map((value) => value.concat(...values)));
  }
}

export { concat };
