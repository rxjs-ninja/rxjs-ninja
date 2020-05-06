/**
 * @packageDocumentation
 * @module boolean
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterTruthy` operator is used to only return truthy values from an
 * {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} stream of values
 *
 * @typeParam T Observable value
 *
 * @example
 * ```ts
 * from([true, false, '', 'test', undefined, 0, 1])
 *  .pipe(filterTruthy())
 *  .subscribe(...) // [true, 'test', 1]
 * ```
 *
 * @returns All values that are truthy only
 * @category RxJS Boolean Utils
 */
export function filterTruthy<T>(): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.pipe(filter<T>(Boolean));
}
