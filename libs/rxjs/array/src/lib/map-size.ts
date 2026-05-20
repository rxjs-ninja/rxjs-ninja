/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable number from `Map.prototype.size` for a Map emitted by the source.
 *
 * @category Map
 *
 * @typeParam K Map key type
 * @typeParam V Map value type
 *
 * @returns An Observable that emits the map size
 */
export function mapSize<K extends unknown, V extends unknown>(): OperatorFunction<Map<K, V>, number> {
  return (source) => source.pipe(map((mapValue) => mapValue.size));
}
