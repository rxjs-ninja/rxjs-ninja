/**
 * @packageDocumentation
 * @module Boolean
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable array of boolean values where the source Observable values have all been flipped
 *
 * @example
 * ```ts
 * fromBoolean([false, true, false])
 *  .pipe(flip())
 *  .subscribe() // true, false, true
 * ```
 *
 * @returns Observable that emits an array where the source Observable values have been flipped
 * @category RxJS Boolean Modify
 */
export function flip(): MonoTypeOperatorFunction<boolean> {
  return (source: Observable<boolean>) => source.pipe(map((value) => !value));
}
