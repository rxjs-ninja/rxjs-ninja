import { MonoTypeOperatorFunction, Observable, defer } from 'rxjs';

/**
 * Triggers callback every time a new observer subscribes to this chain.
 *
 * @param callback
 */
export const tapOnSubscribe = <T>(callback: () => void): MonoTypeOperatorFunction<T> => (source: Observable<T>): Observable<T> =>
  defer(() => {
    callback();
    return source;
  });
