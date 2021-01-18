/**
 * @packageDocumentation
 * @module Random
 */

import { Observable, timer } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { uuidv4 } from '../utils/from-uuid';

/**
 * Returns an Observable that emits a UUID v4, optionally with `emitTime` otherwise it will generate them
 * per tick.
 *
 * @category Random Strings
 *
 * @remarks This operator requires {@link https://developer.mozilla.org/en-US/docs/Web/API/Crypto|Crypto} to work
 *
 * @param emitTime Optional time in `ms` to emit the UUID
 *
 * @example Get a random UUID
 * ```ts
 * fromUUIDv4().pipe(take(1)).subscribe()
 * ```
 * Output: `2a6d71bf-6ccd-4810-bc60-c9ffdedf8864`
 *
 * @returns Observable that emits a UUIDv4
 */
export function fromUUIDv4(emitTime = 0): Observable<string> {
  return new Observable((subscriber) => {
    timer(0, emitTime)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map(() => uuidv4()),
        tap((value) => subscriber.next(value)),
      )
      .subscribe();
  });
}
