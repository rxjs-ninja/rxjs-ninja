import { PredicateFn } from '../types/array-compare';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `every` operator returns a boolean value if the array from the observable source has every member
 * pass a predicate function
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
 *).subscribe() // [true, false, false]
 * ```
 *
 * @returns Boolean value if the array contains all value that matches the predicate
 * @category RxJS Array Query
 */
export function every<T extends unknown>(predicate: PredicateFn<T>): OperatorFunction<T[], boolean> {
  return (source) => source.pipe(map((value) => value.every((v) => predicate(v))));
}
