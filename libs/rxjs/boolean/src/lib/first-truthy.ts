/**
 * @packageDocumentation
 * @module boolean
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { first, onErrorResumeNext } from 'rxjs/operators';

/**
 * The `firstTruthy` operator is used to only the first truthy value from an
 * [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) stream of values
 *
 * @remarks
 * If there is no truthy value, this method will use [onErrorResumeNext](https://rxjs-dev.firebaseapp.com/api/index/function/onErrorResumeNext)
 * so this operator should in combination with operators such as [exhaustMap](https://rxjs-dev.firebaseapp.com/api/operators/exhaustMap)
 *
 * @typeParam T Observable value
 *
 * @example
 * ```ts
 * from([0, false, '', 1])
 * .pipe(
 *    firstTruthy()
 *  ).subscribe(...) // [ 1 ]
 * ```
 * @returns A single value that is truthy
 * @category RxJS Boolean Utils
 */
export function firstTruthy<T>(): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.pipe(first<T>(Boolean), onErrorResumeNext());
}
