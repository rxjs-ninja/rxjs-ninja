/**
 * @packageDocumentation
 * @module Number
 */
import { Observable, Subscribable, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';
import { isArrayOrSet } from '../utils/array-set';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits numbers as a type-safe number generator from a source, if no source is passed it
 * will generate an infinite sequence of positive numbers starting from 0
 *
 * @category Create
 *
 * @param input Optional number source to emit from
 *
 * @example
 * Return an Observable that emits numbers from an Array and multiply by `2`
 * ```ts
 * fromNumber([1, 2, 3, 4]).pipe(mul(2)).subscribe();
 * ```
 * Output: `2, 4, 6, 8`
 *
 * @example
 * Returns an Observable of numbers and take the first 1000, and reduce to an array
 * ```ts
 * fromNumber().pipe(take(1000), reduce((acc, val) => [...acc, val], [])).subscribe();
 * ```
 * Output: `[0, 1, 2, 3, 4, ...]`
 *
 * @returns Observable that emits numbers passed from arguments or array
 */

export function fromNumber<T extends number>(
  input?: Subscribable<Iterable<T> | T> | Iterable<T> | T,
): Observable<number> {
  return new Observable<number>((subscriber) => {
    if (input) {
      const sub = createOrReturnObservable(input)
        .pipe(
          takeWhile(() => !subscriber.closed),
          map<Iterable<T> | T, number[]>((value) => (isArrayOrSet(value) ? [...value] : [value]) as number[]),
          tap((value) => {
            for (let i = 0; i < value.length; i++) {
              subscriber.next(value[i]);
            }
          }),

          finalize(() => {
            /* istanbul ignore next-line */
            !subscriber.closed && subscriber.complete();
          }),
        )
        .subscribe();
      subscriber.add(sub);
    } else {
      const sub = timer(0, 0)
        .pipe(
          tap((value) => subscriber.next(value)),
          finalize(() => {
            /* istanbul ignore next-line */
            !subscriber.closed && subscriber.complete();
          }),
        )
        .subscribe();
      subscriber.add(sub);
    }

    /* istanbul ignore next-line */
    return () => !subscriber.closed && subscriber.complete();
  });
}
