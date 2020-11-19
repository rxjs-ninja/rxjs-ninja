/**
 * @packageDocumentation
 * @module boolean
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { PredicateFn } from '../types/boolean';

/**
 * The `firstTruthy` operator is used to get only the first truthy value from an
 * [Observable](https://rxjs.dev/api/index/class/Observable) stream of values
 *
 * @typeParam T Observable value
 *
 * @param predicate Function to do filtering with
 *
 * @example
 * ```ts
 * fromBoolean<string | number | boolean>([0, false, '', 1])
 *  .pipe(firstTruthy())
 *  .subscribe(console.log) // [ 1 ]
 * ```
 *
 * @example
 * ```ts
 * fromNumber([1, 2, 3, 4])
 *  .pipe(firstTruthy((value) => value % 2 === 0))
 *  .subscribe(console.log) // 2
 * ```
 *
 * @returns The first truthy boolean value
 * @category RxJS Boolean Filters
 */
function firstTruthy<T = unknown>(predicate?: PredicateFn<T>): MonoTypeOperatorFunction<T> {
  if (predicate) {
    return (source: Observable<T>) =>
      source.pipe(
        filter((val) => predicate(val)),
        first(),
      );
  }
  return (source: Observable<T>) => source.pipe(filter<T>(Boolean), first());
}

export { firstTruthy };
