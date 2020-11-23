import { PredicateFn } from '../types/array-compare';
import { OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * The `filterEvery` operator returns an array of values that have a value in the array that matches the predicate
 *
 * @param predicate Method used to check if array contains all valid members
 *
 * @example
 * ```ts
 * fromArray([
 *  [1, 0, 1, 0, 1, 0]
 *  [1, 0, 2, 1, 0, 2],
 *  [0, 1, 0, 1, 0, 2]
 *]).pipe(
 *  every(v => v < 2),
 *).subscribe() // [1, 0, 1, 0, 1, 0]
 * ```
 *
 * @returns Boolean value if the array contains all value that matches the predicate
 * @category RxJS Array Query
 */
export function filterEvery<T extends unknown>(predicate: PredicateFn<T>): OperatorFunction<T[], T[]> {
  return (source) => source.pipe(filter((value) => value.every((v) => predicate(v))));
}
