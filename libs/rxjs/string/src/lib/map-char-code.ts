/**
 * @packageDocumentation
 * @module String
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `mapCharCode` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) a number or
 * array of numbers that represent character codes, and returns a string value
 *
 * @remarks
 * Based on [String.fromCharCode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
 *
 * @example
 * ```ts
 * of(65)
 *  .pipe(mapCharCode())
 *  .subscribe(console.log) // 'A'
 * ```
 *
 * @example
 * ```ts
 * of([65, 66, 67, 68])
 *  .pipe(mapCharCode())
 *  .subscribe(console.log) // 'ABCD'
 * ```
 *
 * @returns String from an array of character codes
 * @category RxJS String Map
 */
export function mapCharCode(): OperatorFunction<number | number[], string> {
  return (source: Observable<number | number[]>) =>
    source.pipe(
      map((values) => (Array.isArray(values) ? String.fromCharCode(...values) : String.fromCharCode(values))),
    );
}
