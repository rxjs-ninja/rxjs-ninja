/**
 * @packageDocumentation
 * @module String
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `mapCodePoint` operator can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) number or array of
 * numbers that represent character code points, and returns a string value
 *
 * Based on [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)
 *
 * @example
 * ```ts
 * of(9733)
 *  .pipe(mapCodePoint())
 *  .subscribe(console.log) // '★'
 * ```
 *
 * @example
 * ```ts
 * of([9731, 9733, 9842])
 *  .pipe(mapCodePoint())
 *  .subscribe(console.log) // '☃★♲'
 *```
 *
 * @returns String from a code point or an array of code points
 * @category RxJS String Map
 */
export function mapCodePoint(): OperatorFunction<number | number[], string> {
  return (source: Observable<number | number[]>) =>
    source.pipe(
      map((values) => (Array.isArray(values) ? String.fromCodePoint(...values) : String.fromCodePoint(values))),
    );
}
