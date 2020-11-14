/**
 * @packageDocumentation
 * @module boolean
 */
import { Subscriber } from 'rxjs';

/**
 * Takes an input of boolean and returns a method that updates an subscriber
 * @private
 * @param input The boolean to subscribe to
 */
export const subscribeToSingleOrArrayBoolean = <T>(input: T | T[]) => (subscriber: Subscriber<boolean>): void => {
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      subscriber.next(Boolean<T>(input[i]));
    }
  } else {
    subscriber.next(Boolean<T>(input));
  }
  subscriber.complete();
};
