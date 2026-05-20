/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, Observable, of, Subscribable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable array created with `Array.of`.
 *
 * @category Array
 *
 * @typeParam T Item type of the emitted array
 *
 * @param first First value, or an Observable/iterable of values
 * @param rest Additional values passed to `Array.of` when using scalar arguments
 *
 * @returns Observable that emits an array of the provided values
 */
export function fromArrayOf<T extends unknown>(
  first: Subscribable<Iterable<T>> | Iterable<T> | T,
  ...rest: T[]
): Observable<T[]> {
  if (rest.length > 0 || isObservable(first) || isIterableCollection(first)) {
    if (rest.length > 0) {
      return of(Array.of(first as T, ...rest));
    }
    return createOrReturnObservable(first as Subscribable<Iterable<T>> | Iterable<T>).pipe(
      map((value) => Array.from(value)),
    );
  }
  return of(Array.of(first as T));
}

function isIterableCollection<T>(value: unknown): value is Iterable<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    Symbol.iterator in Object(value) &&
    !(value instanceof ArrayBuffer)
  );
}
