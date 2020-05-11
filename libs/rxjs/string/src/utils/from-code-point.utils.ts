/**
 * @packageDocumentation
 * @module string
 */
import { Observable, SchedulerLike, Subscriber, Subscription } from 'rxjs';

/**
 * Takes an input of code points and returns a method that updates an subscriber
 * with the string value from the code points
 * @private
 * @param input The array of char codes to convert to a string
 */
export const subscribeToCodePoint = (input: number | number[]) => (subscriber: Subscriber<string>) => {
  if (Array.isArray(input)) {
    subscriber.next(String.fromCodePoint(...input));
  } else {
    subscriber.next(String.fromCodePoint(input));
  }
  subscriber.complete();
};

/**
 * Takes an input of code points and returns a method that updates an subscriber
 * with the string value from the code points
 * @private
 * @param input
 * @param scheduler
 */
export function scheduleCodePoint(input: number | number[], scheduler: SchedulerLike) {
  return new Observable<string>((subscriber) => {
    const sub = new Subscription();
    sub.add(
      scheduler.schedule(function () {
        if (Array.isArray(input)) {
          subscriber.next(String.fromCodePoint(...input));
        } else {
          subscriber.next(String.fromCodePoint(input));
        }
        sub.add(this.schedule());
        subscriber.complete();
      }),
    );
    return sub;
  });
}
