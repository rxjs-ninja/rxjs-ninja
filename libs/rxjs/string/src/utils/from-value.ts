/**
 * @packageDocumentation
 * @module string
 */
import { Observable, SchedulerLike, Subscriber, Subscription } from 'rxjs';

/**
 * Takes an input of number and returns a method that updates an subscriber
 * @private
 * @param input The number to subscribe to
 */
export const subscribeToSingleOrArrayValue = <T>(input: T | T[]) => (subscriber: Subscriber<T>) => {
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      subscriber.next(input[i]);
    }
  } else {
    subscriber.next(input);
  }
  subscriber.complete();
};

/**
 * Takes an input of number and returns a method that updates an subscriber
 * @private
 * @param input The number to subscribe to
 * @param scheduler
 */
export function scheduleSingleOrArrayValue<T>(input: T | T[], scheduler: SchedulerLike): Observable<T> {
  return new Observable<T>((subscriber) => {
    const sub = new Subscription();
    let i = 0;
    sub.add(
      scheduler.schedule(function () {
        if (Array.isArray(input)) {
          if (i === input.length) {
            subscriber.complete();
            return;
          }
          subscriber.next(input[i++]);
        } else {
          subscriber.next(input);
          subscriber.next(input);
        }
        if (!subscriber.closed) {
          sub.add(this.schedule());
        }
      }),
    );
    return sub;
  });
}
