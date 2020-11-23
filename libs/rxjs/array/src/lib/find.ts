/**
 * @packageDocumentation
 * @module array
 */

import { Observable, OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PredicateFn } from '../types/array-compare';

/**
 * The `find` operator returns the first matching item in an array from an observable
 *
 * @example
 * ```ts
 * of(['Hello', 'RxJS', 'Ninja'])
 * .pipe(find(v => v.length < 5))
 * .subscribe() // 'RxJS'
 * ```
 *
 * @returns Unknown value type that is the first item to match the predicate in the array
 * @category RxJS Array Filter
 */
export function find<T extends unknown>(predicate: PredicateFn<T>): OperatorFunction<T[], T> {
  return (source: Observable<T[]>) =>
    source.pipe(
      map((value) => value.find((v) => predicate(v))),
      filter((v) => typeof v !== 'undefined'),
    ) as Observable<T>;
}
