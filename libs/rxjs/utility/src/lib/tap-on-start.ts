/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { CallbackFn } from '../types/utility';

/**
 * Perform a side effect for the first subscription to the source Observable, return an Observable that is identical to the source.
 *
 * @typeParam T The value type of the [Observable](https://rxjs.dev/api/index/class/Observable)
 *
 * @param callback The callback to be executed when this operator is run
 *
 * @example
 * ```ts
 * form.valueChange.pipe(tapOnStart(() => this.onTouch())).subscribe();
 * ```
 *
 * @example
 * ```ts
 * const input = [1, 2, 3, 4];
 * const echoValue = value => `First value is ${value}`;
 *
 * from(input).pipe(tapOnStart(echoValue),reduce((acc, val) => acc + val, 0)).subscribe();
 * // 10
 * ```
 *
 * @returns Observable that emits the source observable after performing a side effect
 * @category Observable Utilities
 */
export function tapOnStart<T extends unknown>(callback: CallbackFn<T>): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) =>
    source.pipe(
      take(1),
      tap(callback),
      switchMap(() => source),
    );
}

/* istanbul ignore next */
/**
 * Perform a side effect for the first subscription to the source Observable, return an Observable that is identical to the source.
 *
 * @typeParam T The value type of the [Observable](https://rxjs.dev/api/index/class/Observable)
 *
 * @param callback The callback to be executed when this operator is run
 *
 * @deprecated
 * @see {@link tapOnStart}
 *
 * @returns Observable that emits the source observable after performing a side effect
 * @category Observable Utilities
 */
export function startWithTap<T extends unknown>(callback: CallbackFn<T>): MonoTypeOperatorFunction<T> {
  return tapOnStart(callback);
}
