/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable boolean from `Map.prototype.has` for a Map emitted by the source.
 *
 * @category Map
 *
 * @typeParam K Map key type
 * @typeParam V Map value type
 *
 * @param key Key to test
 *
 * @returns An Observable that emits whether the map contains the key
 */
export function mapHas<K extends unknown, V extends unknown>(
  key: Subscribable<K> | K,
): OperatorFunction<Map<K, V>, boolean> {
  const key$ = createOrReturnObservable(key);
  return (source) =>
    source.pipe(
      withLatestFrom(key$),
      map(([mapValue, keyValue]) => mapValue.has(keyValue)),
    );
}
