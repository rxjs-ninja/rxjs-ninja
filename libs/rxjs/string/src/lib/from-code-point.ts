/**
 * @packageDocumentation
 * @module string
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `fromCodePoint` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} array of
 * numbers that represent character code points, and returns a string value
 *
 * @remarks
 * Based on [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)
 * This operator takes an array of number values, if you want to only convert one character this still needs passed as an array
 *
 * @example
 * ```ts
 * from([9731, 9733, 9842])
 *  .pipe(
 *    reduce((acc, val) => {
 *      acc.push(val);
 *      return acc;
 *    }, []),
 *    fromCharCode()
 *  ).subscribe(...) // '☃★♲'
 * ```
 *
 * @returns String from an array of character codes
 * @category RxJS From String Creation
 */
export function fromCodePoint(): OperatorFunction<number[], string> {
  return (source: Observable<number[]>) => source.pipe(map((values) => String.fromCodePoint(...values)));
}
