/**
 * @packageDocumentation
 * @module Boolean
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable boolean that is the logical AND of the source and the input boolean.
 *
 * @category Combinator
 *
 * @param other Boolean value or Observable to combine with the source
 *
 *
 * @example
 * Logical AND with a fixed value
 * ```ts
 * of(true, false).pipe(and(true)).subscribe();
 * ```
 * Output: `true, false`
 * @returns Observable that emits `source && other` for each emission
 */
export function and(other: Subscribable<boolean> | boolean): OperatorFunction<boolean, boolean> {
  const other$ = createOrReturnObservable(other);
  return (source) =>
    source.pipe(
      withLatestFrom(other$),
      map(([left, right]) => Boolean(left) && Boolean(right)),
    );
}
