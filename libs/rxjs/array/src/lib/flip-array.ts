/**
 * @packageDocumentation
 * @module array
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `flipArray` operator for arrays takes a boolean array of values and returns the array with all
 * values flipped to the opposite boolean
 *
 * @example
 * ```ts
 * fromBoolean([false, true, false])
 *  .pipe(flipArray())
 *  .subscribe() // [true, false, true]
 * ```
 *
 * @returns Array of boolean values flipped from the input
 * @category RxJS Array Modify
 */
export function flipArray(): MonoTypeOperatorFunction<boolean[]> {
  return (source: Observable<boolean[]>) =>
    source.pipe(
      map((value) => {
        return value.map((v) => !v);
      }),
    );
}
