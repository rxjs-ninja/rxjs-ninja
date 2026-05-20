/**
 * @packageDocumentation
 * @module Random
 */
import { Observable, timer } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { getCrypto } from '../utils/get-crypto';

/**
 * Returns an Observable that emits a UUID from `crypto.randomUUID()`.
 *
 * @category Random Strings
 *
 * @remarks Requires `crypto.randomUUID` (modern browsers and Node.js 19+).
 *
 * @param emitDelay Optional delay in milliseconds between emissions (default `0`)
 *
 * @example
 * Emit one RFC 4122 UUID
 * ```ts
 * fromRandomUUID().pipe(take(1)).subscribe();
 * ```
 *
 * @returns Observable that emits UUID strings
 */
export function fromRandomUUID(emitDelay = 0): Observable<string> {
  return new Observable((subscriber) => {
    const crypto = getCrypto();
    if (typeof crypto.randomUUID !== 'function') {
      subscriber.error(new Error('crypto.randomUUID is not available in this environment'));
      return;
    }

    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map(() => crypto.randomUUID()),
        tap((value) => subscriber.next(value)),
      )
      .subscribe({
        error: (err) => subscriber.error(err),
        complete: () => subscriber.complete(),
      });
  });
}
