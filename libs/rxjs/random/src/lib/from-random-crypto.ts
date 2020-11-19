/**
 * @packageDocumentation
 * @module random
 */
import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';

/**
 * An Observable string value generator that generates random numbers using [Crypto.getRandomValues](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)
 * to generate a number. Pass an optional emit time to use as a timer.
 *
 * @param emitDelay If set the observable will emit per millisecond set, by default this is 0
 *
 * @example
 * ```ts
 * fromRandomCrypto()
 * .pipe(tap(console.log))
 * .subscribe() // 1228475997, 258463200, 850749141, 3060206219...
 * ```
 *
 * @returns Observable with a stream of random numbers
 * @category RxJS Random Observables
 */
export function fromRandomCrypto(emitDelay = 0): Observable<number> {
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
