/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable Map with an entry removed using `Map.prototype.delete` (does not mutate the source Map).
 *
 * @category Map
 *
 * @typeParam K Map key type
 * @typeParam V Map value type
 *
 * @param key Key to delete
 *
 * @returns An Observable that emits a new Map without the key
 */
export function mapDelete<K extends unknown, V extends unknown>(
  key: Subscribable<K> | K,
): OperatorFunction<Map<K, V>, Map<K, V>> {
  const key$ = createOrReturnObservable(key);
  return (source) =>
    source.pipe(
      withLatestFrom(key$),
      map(([mapValue, keyValue]) => {
        const next = new Map(mapValue);
        next.delete(keyValue);
        return next;
      }),
    );
}
