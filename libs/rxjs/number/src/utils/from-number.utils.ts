/**
 * @packageDocumentation
 * @module number
 */
import { Subscriber } from 'rxjs';

/**
 * Takes an input of number and returns a method that updates an subscriber
 * @param input The number to subscribe to
 *
 * @private
 * @internal
 */
export const subscribeToSingleOrArrayNumber = <T>(input: number | number[]) => (subscriber: Subscriber<number>) => {
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      subscriber.next(input[i]);
    }
  } else {
    subscriber.next(input);
  }
  subscriber.complete();
};
