/**
 * @packageDocumentation
 * @module boolean
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

/**
 * The `firstTruthy` operator is used to get only the first truthy value from an
 * [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) stream of values
 *
 * @typeParam T Observable value
 *
 * @example
 * ```ts
 * fromBoolean<string | number | boolean>([0, false, '', 1])
 *  .pipe(firstTruthy())
 *  .subscribe(console.log) // [ 1 ]
 * ```
 *
 * @returns The first truthy boolean value
 * @category RxJS Boolean Filters
 */
function firstTruthy<T>(): MonoTypeOperatorFunction<T>;
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
 *  .subscribe(console.log) // 2
 * ```
 *
 * @returns The first truthy boolean value
 * @category RxJS Boolean Filters
 */
function firstTruthy<T>(predicate: (arg: T) => boolean): MonoTypeOperatorFunction<T>;
function firstTruthy<T>(predicate?: (arg: T) => boolean): MonoTypeOperatorFunction<T> {
  if (predicate) {
    return (source: Observable<T>) => source.pipe(filter<T>(predicate), take(1));
  }
  return (source: Observable<T>) => source.pipe(filter<T>(Boolean), take(1));
}

export { firstTruthy };
