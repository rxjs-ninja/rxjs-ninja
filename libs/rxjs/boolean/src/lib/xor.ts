/**
 * @packageDocumentation
 * @module Boolean
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable boolean that is the logical XOR of the source and the input boolean.
 *
 * @category Combinator
 *
 * @param other Boolean value or Observable to combine with the source
 *
 * @returns Observable that emits whether exactly one of the values is truthy
 */
export function xor(other: Subscribable<boolean> | boolean): OperatorFunction<boolean, boolean> {
  const other$ = createOrReturnObservable(other);
  return (source) =>
    source.pipe(
      withLatestFrom(other$),
      map(([left, right]) => Boolean(left) !== Boolean(right)),
    );
}
