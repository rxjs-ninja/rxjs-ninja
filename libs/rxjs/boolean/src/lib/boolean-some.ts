/**
 * @packageDocumentation
 * @module Boolean
 */
import { OperatorFunction } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

/**
 * Returns an Observable boolean that emits once when the source completes, indicating whether at least one emitted
 * boolean was truthy.
 *
 * @category Query
 *
 * @returns Observable that emits whether any boolean emission was truthy
 */
export function booleanSome(): OperatorFunction<boolean, boolean> {
  return (source) =>
    source.pipe(
      toArray(),
      map((values) => values.some((value) => Boolean(value))),
    );
}
