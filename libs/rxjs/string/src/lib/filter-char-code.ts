/**
 * @packageDocumentation
 * @module string
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `filterCharCode` operator can be used with an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} array of
 * numbers that represent character codes, and returns a string value
 *
 * @remarks
 * Based on [String.fromCharCode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
 * This operator takes an array of number values, if you want to only convert one character this still needs passed as an array
 *
 * @example
 * ```ts
 * of([65, 66, 67, 68])
 *  .pipe(
 *    reduce((acc, val) => {
 *      acc.push(val);
 *      return acc;
 *    }, []),
 *    filterCharCode()
 *  ).subscribe(...) // 'ABCD'
 * ```
 *
 * @returns String from an array of character codes
 * @category RxJS From String Creation
 */
export function filterCharCode(): OperatorFunction<number[], string> {
  return (source: Observable<number[]>) => source.pipe(map((values) => String.fromCharCode(...values)));
}
