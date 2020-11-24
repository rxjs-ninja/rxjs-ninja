/**
 * @packageDocumentation
 * @module Boolean
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `flip` operator simply flips a boolean value
 *
 * @example
 * ```ts
 * fromBoolean([false, true, false])
 *  .pipe(flip())
 *  .subscribe() // true, false, true
 * ```
 *
 * @returns Boolean value flipped from the input
 * @category RxJS Boolean Modify
 */
export function flip(): MonoTypeOperatorFunction<boolean> {
  return (source: Observable<boolean>) => source.pipe(map((value) => !value));
}
