import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';

/**
 * An Observable string value generator that generates random integers using
 * the `Crypto.getRandomValues` method.
 * @param emitDelay
 */
export function fromCryptoRandom(emitDelay = 0) {
  return new Observable((subscriber: Subscriber<number>) => {
    const arr = new Uint32Array(1);
    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        tap(() => window.crypto.getRandomValues(arr)),
        map(() => arr[0]),
        tap((value) => subscriber.next(value)),
        finalize(() => subscriber.complete()),
      )
      .subscribe();
  });
}
