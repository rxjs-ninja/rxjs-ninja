/**
 * @packageDocumentation
 * @module Utility
 */
import { defer, MonoTypeOperatorFunction, of } from 'rxjs';
import { CallbackFn } from '../types/utility';
import { switchMap, take, tap } from 'rxjs/operators';

/**
 * Perform a side effect for every subscription to the source Observable and return an Observable that is identical to
 * the source.
 *
 * @category Side Effects
 *
 * @typeParam T The value type of the source
 *
 * @param callback [[CallbackFn]] to be executed when this operator is run
 *
 * @example
 * Perform a side effect on every new subscription to a source
 * ```ts
 * const onClick$ = fromEvent(element, 'click').pipe(tapOnSubscribe(( ) => console.log('New Subscription')));
 *
 * onClick$.subscribe();
 * onClick$.subscribe();
 * ```
 * Output: `'New Subscription', 'New Subscription'`
 *
 * @returns Observable that emits the source observable after performing a side effect
 */
export function tapOnSubscribe<T extends unknown>(callback: CallbackFn<undefined>): MonoTypeOperatorFunction<T> {
  return (source) =>
    defer(() =>
      of(undefined).pipe(
        tap(callback),
        switchMap(() => source),
      ),
    );
}
