/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable reversed array without mutating the source using `Array.prototype.toReversed`.
 *
 * @category Modify
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @returns An Observable that emits the reversed array
 */
export function toReversed<T extends unknown>(): OperatorFunction<Iterable<T>, T[]> {
  return (source) => source.pipe(map((value) => [...value].toReversed()));
}
