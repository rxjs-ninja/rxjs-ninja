/**
 * @packageDocumentation
 * @module Array
 */

import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `reverse` operator reverses and array from an observable source
 *
 * @example
 * ```ts
 * of(['Hello', 'RxJS', 'Ninja'])
 * .pipe(reverse())
 * .subscribe() // ['Ninja', 'RxJS', 'Hello']
 * ```
 *
 * @returns Array of the input source reversed
 * @category RxJS Array Modify
 */
export function reverse<T extends unknown>(): OperatorFunction<T[], T[]> {
  return (source: Observable<T[]>) => source.pipe(map((value) => [...value].reverse()));
}
