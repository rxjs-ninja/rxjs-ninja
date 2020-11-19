import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';

export function fromRandomInt(min = 0, max = 1, emitDelay = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return new Observable((subscriber: Subscriber<number>) => {
    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map((value) => Math.floor(Math.random() * (max - min + 1) + min)),
        tap((value) => subscriber.next(value)),
        finalize(() => subscriber.complete()),
      )
      .subscribe();
  });
}
