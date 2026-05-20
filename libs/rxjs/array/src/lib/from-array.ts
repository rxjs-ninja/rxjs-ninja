/**
 * @packageDocumentation
 * @module Array
 */
import { Observable, Subscribable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapFn } from '../types/generic-methods';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable array created with `Array.from`.
 *
 * @category Array
 *
 * @typeParam T Item type of the array-like or iterable input
 * @typeParam K Item type of the emitted array when a [[MapFn]] is provided
 *
 * @param input Array-like or iterable source
 * @param mapFn Optional [[MapFn]] passed to `Array.from`
 *
 * @returns Observable that emits an array built from the input
 */
export function fromArray<T extends unknown, K extends unknown = T>(
  input: Subscribable<ArrayLike<T> | Iterable<T>> | ArrayLike<T> | Iterable<T>,
  mapFn?: MapFn<T, K>,
): Observable<K[]> {
  return createOrReturnObservable(input).pipe(
    map((value) => (mapFn ? Array.from(value, mapFn) : Array.from(value)) as K[]),
  );
}
