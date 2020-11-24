/**
 * @packageDocumentation
 * @module Array
 */

import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredicateFn } from '../types/array-compare';

/**
 * The `findIndex` operator returns the index of the first matching item in an array from an observable
 *
 * @example
 * ```ts
 * of(['Hello', 'RxJS', 'Ninja'])
 * .pipe(findIndex(v => v.length < 5))
 * .subscribe() // 1
 * ```
 *
 * @returns Number value of the index of the value that was found via predicate
 * @category RxJS Array Filter
 */
export function findIndex<T extends unknown>(predicate: PredicateFn<T>): OperatorFunction<T[], number> {
  return (source: Observable<T[]>) => source.pipe(map((value) => value.findIndex((v) => predicate(v))));
}
