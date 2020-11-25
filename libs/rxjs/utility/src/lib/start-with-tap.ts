/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CallbackFn } from '../types/utility';

/**
 * Operator that is only executed on the first emission from an [Observable](https://rxjs.dev/api/index/class/Observable)
 * The operator is passed a callback which is then executed
 *
 * @remarks
 * This is similar to the [tap](https://rxjs.dev/api/operators/tap) operator but is only executed once
 *
 * @typeParam T The value type of the [Observable](https://rxjs.dev/api/index/class/Observable)
 *
 * @param callback The callback to be executed when this operator is run
 *
 * @example
 * ```ts
 * form.valueChange.pipe(
 *  startWithTap(() => this.onTouch())
 * ).subscribe();
 * ```
 *
 * @example
 * ```ts
 * from([1, 2, 3, 4])
 *  .pipe(
 *    startWithTap(value => `First value is ${value}`),
 *    reduce((acc, val) => acc + val)
 *  ).subscribe(); // 10
 * ```
 *
 * @returns An [Observable](https://rxjs.dev/api/index/class/Observable) value of T
 * @category RxJS Observable Utilities
 */
export function startWithTap<T extends unknown>(callback: CallbackFn): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) =>
    of(undefined).pipe(
      tap(callback),
      switchMap(() => source),
    );
}
