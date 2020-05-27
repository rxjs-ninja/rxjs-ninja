/**
 * @packageDocumentation
 * @module string
 */
import { Subscriber } from 'rxjs';

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
