/**
 * @packageDocumentation
 * @module String
 */
import { isObservable, Observable, of, Subscribable } from 'rxjs';

export function createOrReturnObservable<T extends unknown>(input: Subscribable<T> | T): Observable<T> {
  return (isObservable(input) ? input : of(input)) as Observable<T>;
}
