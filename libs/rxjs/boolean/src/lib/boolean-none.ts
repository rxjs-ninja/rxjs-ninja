/**
 * @packageDocumentation
 * @module Boolean
 */
import { OperatorFunction } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

/**
 * Returns an Observable boolean that emits once when the source completes, indicating whether no emitted boolean was
 * truthy.
 *
 * @category Query
 *
 * @returns Observable that emits whether every boolean emission was falsy
 */
export function booleanNone(): OperatorFunction<boolean, boolean> {
  return (source) =>
    source.pipe(
      toArray(),
      map((values) => values.length === 0 || values.every((value) => !Boolean(value))),
    );
}
