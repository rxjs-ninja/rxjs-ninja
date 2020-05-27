/**
 * @packageDocumentation
 * @module string
 */
import { Subscriber } from 'rxjs';

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
