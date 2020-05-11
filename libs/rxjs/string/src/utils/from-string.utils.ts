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
export const subscribeToSingleOrArrayString = (input: string | string[]) => (subscriber: Subscriber<string>) => {
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
 * Takes an input of string and returns a method that updates an subscriber
 * @private
 * @param input The string to subscribe to
 * @param scheduler
 */
export function scheduleSingleOrArrayString(input: string | string[], scheduler: SchedulerLike): Observable<string> {
  return new Observable<string>((subscriber: Subscriber<string>) => {
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
