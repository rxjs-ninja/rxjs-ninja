import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';

/**
 * An Observable string value generator that generates random strings of the passed length
 * @param length
 * @param emitDelay
 */
export function fromRandomStr(length = 10, emitDelay = 0) {
  return new Observable((subscriber: Subscriber<string>) => {
    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map((value) => [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('')),
        tap((value) => subscriber.next(value)),
        finalize(() => subscriber.complete()),
      )
      .subscribe();
  });
}
