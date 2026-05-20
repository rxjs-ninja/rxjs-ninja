/**
 * @packageDocumentation
 * @module Boolean
 */
import { OperatorFunction } from 'rxjs';
import { every } from 'rxjs/operators';

/**
 * Returns an Observable boolean that emits once when the source completes, indicating whether every emitted boolean
 * was truthy (same semantics as RxJS `every` on a boolean stream).
 *
 * @category Query
 *
 * @returns Observable that emits whether all boolean emissions were truthy
 */
export function booleanEvery(): OperatorFunction<boolean, boolean> {
  return (source) => source.pipe(every((value) => Boolean(value)));
}
