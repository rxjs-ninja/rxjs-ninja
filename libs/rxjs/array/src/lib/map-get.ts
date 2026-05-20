/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable value from `Map.prototype.get` for a Map emitted by the source.
 *
 * @category Map
 *
 * @typeParam K Map key type
 * @typeParam V Map value type
 *
 * @param key Key to read from the map
 *
 * @returns An Observable that emits the value for the key, or `undefined` if absent
 */
export function mapGet<K extends unknown, V extends unknown>(
  key: Subscribable<K> | K,
): OperatorFunction<Map<K, V>, V | undefined> {
  const key$ = createOrReturnObservable(key);
  return (source) =>
    source.pipe(
      withLatestFrom(key$),
      map(([mapValue, keyValue]) => mapValue.get(keyValue)),
    );
}
