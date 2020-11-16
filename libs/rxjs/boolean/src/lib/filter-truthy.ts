/**
 * @packageDocumentation
 * @module boolean
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FilterPredicateFn } from '../types/boolean';

/**
 * The `filterTruthy` operator is used to only return truthy values from an
 * [Observable](https://rxjs.dev/api/index/class/Observable) stream of values
 *
 * @typeParam T Observable value
 *
 * @param predicate Optional predicate method to provide to filter
 *
 * @example
 * ```ts
 * from(['', 'test1', '', 'test2', ''])
 *  .pipe(filterTruthy())
 *  .subscribe(console.log) // ['test1', 'test2']
 * ```
 * @example
 * ```ts
 * const isEven = (num: number) => num % 2 === 0
 *
 * from([0, 1, 2, 3, 4, 5])
 *  .pipe(filterTruthy(item => isEven(item)))
 *  .subscribe(console.log) // [0, 2, 4]
 * ```
 *
 * @returns All values that are truthy only
 * @category RxJS Boolean Filters
 */
export function filterTruthy<T = unknown>(predicate?: FilterPredicateFn<T>): MonoTypeOperatorFunction<T> {
  if (predicate) {
    return (source: Observable<T>) => source.pipe(filter((value) => predicate(value)));
  }
  return (source: Observable<T>) => source.pipe(filter<T>(Boolean));
}
