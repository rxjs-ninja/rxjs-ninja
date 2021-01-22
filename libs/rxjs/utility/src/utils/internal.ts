/**
 * @packageDocumentation
 * @module Utility
 */
/* istanbul ignore file */
import { isObservable, Observable, of, Subscribable } from 'rxjs';

/**
 * @private
 * @internal
 * @param input
 */
export function createOrReturnObservable<T extends unknown>(input: Subscribable<T> | T): Observable<T> {
  return (isObservable(input) ? input : of(input)) as Observable<T>;
}

/**
 * @private
 * @param num
 * @param places
 */
export function roundNumber(num: number, places: number): number {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
}
