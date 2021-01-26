/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { CallbackFn } from '../types/utility';

/**
 * Perform a side effect for every unsubscription to the source Observable and return an Observable that is identical to
 * the source.
 *
 * @category Side Effects
 *
 * @typeParam T The value type of the source
 *
 * @param callback [[CallbackFn]] to be executed when this operator is run
 *
 * @example
 * Perform a side effect on every new unsubscription to a source
 * ```ts
 * const onClick$ = fromEvent(element, 'click').pipe(tapOnUnsubscribe(( ) => console.log('End Subscription')));
 *
 * onClick$.pipe(take(1)).subscribe();
 * onClick$.pipe(take(1)).subscribe();
 * ```
 * Output: `'End Subscription', 'End Subscription'`
 *
 * @returns Observable that emits the source Observable and calls the `callback` on unsubscription
 */
export function tapOnUnsubscribe<T extends unknown>(callback: CallbackFn<undefined>): MonoTypeOperatorFunction<T> {
  return (source) =>
    new Observable<T>((subscriber) => {
      const sub = source.subscribe(subscriber);

      return () => {
        callback();
        !sub.closed && sub.unsubscribe();
      };
    });
}
