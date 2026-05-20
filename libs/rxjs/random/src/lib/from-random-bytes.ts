/**
 * @packageDocumentation
 * @module Random
 */
import { Observable, timer } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { getCrypto } from '../utils/get-crypto';

/**
 * Returns an Observable that emits `Uint8Array` buffers filled with `crypto.getRandomValues`.
 *
 * @category Random Bytes
 *
 * @param byteLength Number of random bytes per emission (default `16`)
 * @param emitDelay Optional delay in milliseconds between emissions (default `0`)
 *
 * @example
 * Emit 16 random bytes per tick
 * ```ts
 * fromRandomBytes(16).pipe(take(3)).subscribe();
 * ```
 *
 * @returns Observable that emits random byte arrays
 */
export function fromRandomBytes(byteLength = 16, emitDelay = 0): Observable<Uint8Array<ArrayBuffer>> {
  return new Observable((subscriber) => {
    if (!Number.isInteger(byteLength) || byteLength <= 0) {
      subscriber.error(new RangeError('byteLength must be a positive integer'));
      return;
    }

    const crypto = getCrypto();
    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map(() => {
          const bytes = new Uint8Array(byteLength);
          crypto.getRandomValues(bytes);
          return bytes;
        }),
        tap((value) => subscriber.next(value)),
      )
      .subscribe();
  });
}
