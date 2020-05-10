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
export const subscribeToNumber = (input: number) => (subscriber: Subscriber<number>) => {
  subscriber.next(input);
  subscriber.complete();
};

/**
 * Takes an input of number and returns a method that updates an subscriber
 * @private
 * @param input The number to subscribe to
 * @param scheduler
 */
export function scheduleNumber(input: number, scheduler: SchedulerLike) {
  return new Observable<number>((subscriber) => {
    const sub = new Subscription();
    sub.add(
      scheduler.schedule(function () {
        subscriber.next(input);
        sub.add(this.schedule());
        subscriber.complete();
      }),
    );
    return sub;
  });
}
