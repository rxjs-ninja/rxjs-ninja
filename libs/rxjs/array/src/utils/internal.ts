/**
 * @packageDocumentation
 * @module String
 */
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
 * Flat map `Set` into an `Array` of `unknown[]`
 * @private
 * @internal
 * @param input
 */
export function flatMapSet<T extends unknown>(input: Iterable<Set<T>> | Set<T>): T[][] {
  return Array.isArray(input) ? ([...input.map((set) => [...set])] as T[][]) : ([[...input]] as T[][]);
}

/**
 * Flat map `Set` into an `Array` of `unknown[]`
 * @private
 * @internal
 * @param input
 */
export function flatMapMap<K extends unknown, V extends unknown>(input: Iterable<Map<K, V>> | Map<K, V>): [K, V][] {
  return Array.isArray(input) ? ([...input.map((map) => [...map])] as [K, V][]) : ([[...input]] as [K, V][]);
}
