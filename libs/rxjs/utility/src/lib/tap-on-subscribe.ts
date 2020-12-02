/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, Observable, defer } from 'rxjs';
import { CallbackFn } from '../types/utility';

/**
 * Perform a side effect for every subscription to the source Observable, but return an Observable that is identical to the source.
 *
 * @typeParam T Value type of the source Observable
 *
 * @param callback The [[CallbackFn]] to be called on subscription
 *
 * @example
 * ```ts
 * const onClick$ = fromEvent(element, 'click').pipe(tapOnSubscribe(() => console.log('New Subscription')));
 *
 * onClick$.subscribe();  // New Subscription
 * onClick$.subscribe();  // New Subscription
 * ```
 *
 * @returns Observable that emits the source observable
 * @category RxJS Observable Utilities
 */
export function tapOnSubscribe<T extends unknown>(callback: CallbackFn<T>): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>): Observable<T> =>
    defer(() => {
      callback();
      return source;
    });
}
