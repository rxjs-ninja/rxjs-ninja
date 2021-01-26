import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Returns the source Observable that will use the passed AbortSignal to handle unsubscription
 *
 * @category Subscription
 *
 * @typeParam T The value of the Observable
 *
 * @param signal The signal used to end the subscription
 *
 * @example
 * Pass a signal to handle unsubscription
 * ```ts
 * const stop = new AbortController();
 *
 * const source$ = from([1, 2, 3, 4, 5]);
 *
 * source.pipe(takeUntilSignal(stop.signal)).subscribe();
 * ```
 *
 * @returns Observable that will end subscription when the AbortSignal has been fired
 */
export function takeUntilSignal<T extends unknown>(signal: AbortSignal): MonoTypeOperatorFunction<T> {
  const innerSubject$ = new Subject();
  signal.onabort = () => innerSubject$.next();
  return (source) => source.pipe(takeUntil(innerSubject$));
}
