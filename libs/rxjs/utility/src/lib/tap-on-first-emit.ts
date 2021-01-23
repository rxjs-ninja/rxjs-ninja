/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { CallbackFn } from '../types/utility';

/**
 * Perform a side effect for the first subscription to the source Observable, return an Observable that is identical to
 * the source.
 *
 * @category Side Effects
 *
 * @typeParam T The value type of the source
 *
 * @param callback [[CallbackFn]] to be executed when this operator is run
 *
 * @example
 * Perform a side effect on first subscription to the source
 * ```ts
 * const input = ['Hello', 'RxJS', 'Ninja'];
 * const echoValue = value => `First value is ${value}`;
 *
 * from(input).pipe(tapOnFirstEmit(echoValue)).subscribe();
 * ```
 * Output: `Hello`
 *
 * @returns Observable that emits the source observable after performing a side effect
 */
export function tapOnFirstEmit<T extends unknown>(callback: CallbackFn<T>): MonoTypeOperatorFunction<T> {
  return (source) =>
    source.pipe(
      take(1),
      tap(callback),
      switchMap(() => source),
    );
}
