/**
 * @packageDocumentation
 * @module boolean
 */
import { Observable, SchedulerLike, Subscriber, Subscription } from 'rxjs';

/**
 * Takes an input of boolean and returns a method that updates an subscriber
 * @private
 * @param input The boolean to subscribe to
 */
export const subscribeToSingleOrArrayBoolean = <T>(input: T | T[]) => (subscriber: Subscriber<boolean>) => {
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      subscriber.next(Boolean<T>(input[i]));
    }
  } else {
    subscriber.next(Boolean<T>(input));
  }
  subscriber.complete();
};

/**
 * Takes an input of boolean and returns a method that updates an subscriber
 * @private
 * @param input The boolean to subscribe to
 * @param scheduler
 */
export function scheduleSingleOrArrayBoolean<T>(input: T | T[], scheduler: SchedulerLike): Observable<boolean> {
  return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
    const sub = new Subscription();
    let i = 0;
    sub.add(
      scheduler.schedule(function () {
        if (Array.isArray(input)) {
          if (i === input.length) {
            subscriber.complete();
            return;
          }
          subscriber.next(Boolean<T>(input[i++]));
        } else {
          subscriber.next(Boolean<T>(input));
          subscriber.complete();
        }
        if (!subscriber.closed) {
          sub.add(this.schedule());
        }
      }),
    );
    return sub;
  });
}
