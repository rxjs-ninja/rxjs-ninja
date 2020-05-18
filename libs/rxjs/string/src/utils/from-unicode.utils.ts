/**
 * @packageDocumentation
 * @module string
 */
import { Observable, SchedulerLike, Subscriber, Subscription } from 'rxjs';
import { FormType } from '../types/normalize';

/**
 * Takes an input of number and returns a method that updates an subscriber
 * @private
 * @param input The number to subscribe to
 * @param form
 */
export const subscribeToSingleOrArrayUnicode = (input: string | string[], form: FormType) => (subscriber: Subscriber<string>) => {
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      subscriber.next(input[i].normalize(form));
    }
  } else {
    subscriber.next(input.normalize(form));
  }
  subscriber.complete();
};

/**
 * Takes an input of string and returns a method that updates an subscriber
 * @private
 * @param input The string to subscribe to
 * @param form
 * @param scheduler
 */
export function scheduleSingleOrArrayUnicode(input: string | string[], form: FormType, scheduler: SchedulerLike): Observable<string> {
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
          subscriber.next(input[i++].normalize(form));
        } else {
          subscriber.next(input.normalize(form));
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
