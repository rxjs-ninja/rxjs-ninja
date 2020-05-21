/**
 * @packageDocumentation
 * @module utility
 */
import { MonoTypeOperatorFunction, Observable, defer } from 'rxjs';
import { CallbackFn } from '../types/utility';

/**
 * Operator that is executed on each subscription to an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable)
 * The operator is passed a callback which is then executed
 *
 * @remarks
 * This is similar to the [tap](https://rxjs-dev.firebaseapp.com/api/operators/tap) operator but fires when a subscription occurs
 *
 * @typeParam T The value type of the [Observable](https://rxjs-dev.firebaseapp.com/guide/observable)
 *
 * @param callback The callback to be executed when this operator is run
 *
 * @example
 * ```ts
 * fromEvent(element, 'click').pipe(
 *  tapOnSubscribe(() => console.log('New Subscription'))
 * ).subscribe()
 * ```
 *
 * @returns An [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) value of T
 * @category RxJS Observable Utilities
 */
export function tapOnSubscribe<T>(callback: CallbackFn): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>): Observable<T> =>
    defer(() => {
      callback();
      return source;
    });
}
