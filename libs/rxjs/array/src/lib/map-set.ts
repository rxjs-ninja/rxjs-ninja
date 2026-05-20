/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable Map with an entry set using `Map.prototype.set` (does not mutate the source Map).
 *
 * @category Map
 *
 * @typeParam K Map key type
 * @typeParam V Map value type
 *
 * @param key Key to set
 * @param value Value to associate with the key
 *
 * @returns An Observable that emits a new Map with the entry set
 */
export function mapSet<K extends unknown, V extends unknown>(
  key: Subscribable<K> | K,
  value: Subscribable<V> | V,
): OperatorFunction<Map<K, V>, Map<K, V>> {
  const key$ = createOrReturnObservable(key);
  const value$ = createOrReturnObservable(value);
  return (source) =>
    source.pipe(
      withLatestFrom(key$, value$),
      map(([mapValue, keyValue, valueValue]) => new Map(mapValue).set(keyValue, valueValue)),
    );
}
