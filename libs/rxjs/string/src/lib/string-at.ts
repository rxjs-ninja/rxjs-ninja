/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable string containing the single UTF-16 code unit at an index using `String.prototype.at`.
 *
 * @category Query
 *
 * @param index Index to read (supports negative indices)
 *
 * @returns Observable that emits the character at the index, or `undefined` if out of range
 */
export function stringAt(
  index: Subscribable<number> | number,
): OperatorFunction<string, string | undefined> {
  const index$ = createOrReturnObservable(index);
  return (source) =>
    source.pipe(
      withLatestFrom(index$),
      map(([value, indexValue]) => value.at(indexValue)),
    );
}
