/**
 * @packageDocumentation
 * @module string
 */
import { Observable, SchedulerLike, Subscriber, Subscription } from 'rxjs';

/**
 * Takes an input of char codes and returns a method that updates an subscriber
 * with the string value from the char codes
 * @private
 * @param input The array of char codes to convert to a string
 */
export function subscribeToCharCode(input: number[]) {
  return (subscriber: Subscriber<string>) => {
    subscriber.next(String.fromCharCode(...input));
    subscriber.complete();
  };
}

/**
 * Takes an input of char codes and returns a method that updates an subscriber
 * with the string value from the char codes
 * @private
 * @param input
 * @param scheduler
 */
export function scheduleCharCode(input: number[], scheduler: SchedulerLike) {
  return new Observable<string>((subscriber) => {
    const sub = new Subscription();
    sub.add(
      scheduler.schedule(function () {
        subscriber.next(String.fromCharCode(...input));
        sub.add(this.schedule());
        subscriber.complete();
      }),
    );
    return sub;
  });
}
