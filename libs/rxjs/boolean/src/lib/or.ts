/**
 * @packageDocumentation
 * @module Boolean
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable boolean that is the logical OR of the source and the input boolean.
 *
 * @category Combinator
 *
 * @param other Boolean value or Observable to combine with the source
 *
 * @returns Observable that emits `source || other` for each emission
 */
export function or(other: Subscribable<boolean> | boolean): OperatorFunction<boolean, boolean> {
  const other$ = createOrReturnObservable(other);
  return (source) =>
    source.pipe(
      withLatestFrom(other$),
      map(([left, right]) => Boolean(left) || Boolean(right)),
    );
}
