/**
 * @packageDocumentation
 * @module boolean
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, takeLast } from 'rxjs/operators';
import { PredicateFn } from '../types/boolean';

/**
 * The `lastTruthy` operator is used to get only the first truthy value from an
 * [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) stream of values
 *
 * @typeParam T Observable value
 *
 * @example
 * ```ts
 * fromString(['a', 'b', 'c'])
 *  .pipe(lastTruthy())
 *  .subscribe(console.log) // 'c'
 * ```
 *
 * @returns The last truthy boolean value
 * @category RxJS Boolean Filters
 */
function lastTruthy<T>(): MonoTypeOperatorFunction<T>;
/**
 * If a predicate function is passed, this will be used to do the equality check
 *
 * @typeParam T Observable value
 *
 * @param predicate Function to do filtering with
 *
 * @example
 * ```ts
 * fromNumber([1, 2, 3, 4])
 *  .pipe(firstTruthy((value) => value % 2 === 0))
 *  .subscribe(console.log) // 4
 * ```
 *
 * @returns The last truthy boolean value
 * @category RxJS Boolean Filters
 */
function lastTruthy<T>(predicate: PredicateFn<T>): MonoTypeOperatorFunction<T>;
function lastTruthy<T>(predicate?: PredicateFn<T>): MonoTypeOperatorFunction<T> {
  if (predicate) {
    return (source: Observable<T>) => source.pipe(filter<T>(predicate), takeLast(1));
  }
  return (source: Observable<T>) => source.pipe(filter<T>(Boolean), takeLast(1));
}

export { lastTruthy };
