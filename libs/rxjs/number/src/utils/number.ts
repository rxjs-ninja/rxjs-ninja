/**
 * @packageDocumentation
 * @module number
 */
import { Observable, SchedulerLike, Subscriber, Subscription } from 'rxjs';

/**
 * Takes an input of number and returns a method that updates an subscriber
 * @private
 * @param input The number to subscribe to
 */
export const subscribeToNumber = (input: number | number[]) => (subscriber: Subscriber<number>) => {
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
export function scheduleNumber(input: number | number[], scheduler: SchedulerLike) {
  return new Observable<number>((subscriber) => {
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
