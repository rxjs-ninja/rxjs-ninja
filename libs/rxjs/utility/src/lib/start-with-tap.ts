/**
 * @packageDocumentation
 * @module utility
 */
import { MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

/**
 * Operator that is only executed on the first emission from an {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 * The operator is passed a callback which is then executed
 *
 * @remarks
 * This is similar to the [tap](https://rxjs-dev.firebaseapp.com/api/operators/tap) operator but is only executed once
 *
 * @typeParam T The value type of the {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable}
 *
 * @param callback The callback to be executed when this operator is run
 *
 * @example
 * ```ts
 * form.valueChange.pipe(
 *  startWithTap(() => this.onTouch())
 * ).subscribe()
 * ```
 *
 * @returns An {@link https://rxjs-dev.firebaseapp.com/guide/observable|Observable} value of T
 * @category RxJS Observable Utilities
 */
export function startWithTap<T = unknown>(callback: () => void): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) =>
    of(undefined).pipe(
      tap(callback),
      switchMap(() => source),
    );
}
