/**
 * @packageDocumentation
 * @module string
 */
import { Observable, SchedulerLike, Subscriber, Subscription } from 'rxjs';

/**
 * Takes an input of string and returns a method that updates an subscriber
 * @private
 * @param input The string to subscribe to
 */
export const subscribeToString = (input: string) => (subscriber: Subscriber<string>) => {
  subscriber.next(input);
  subscriber.complete();
};

/**
 * Takes an input of string and returns a method that updates an subscriber
 * @private
 * @param input The string to subscribe to
 * @param scheduler
 */
export function scheduleString(input: string, scheduler: SchedulerLike) {
  return new Observable<string>((subscriber) => {
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
