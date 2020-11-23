import { PredicateFn } from '../types/array-compare';
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterSome` operator returns a boolean value if the array from the observable source has at least one
 * member that passes the passed predicate method
 *
 * @param predicate Method used to check if array contains a valid member
 *
 * @example
 * ```ts
 * fromArray([
 *  ['RxJS', 'Rocks']
 *  ['RxJS', 'Ninja'],
 *  ['Foo', 'Bar']
 *]).pipe(
 *  filterSome(v => v === 'RxJS'),
 *).subscribe() // [ ['RxJS', 'Rocks'], ['RxJS', 'Ninja'] ]
 * ```
 *
 * @returns Array of values where one value matches the predicate
 * @category RxJS Array Query
 */
export function filterSome<T extends unknown>(predicate: PredicateFn): MonoTypeOperatorFunction<T[]> {
  return (source) => source.pipe(filter((value) => value.some(predicate)));
}
