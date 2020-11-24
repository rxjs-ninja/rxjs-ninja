/**
 * @packageDocumentation
 * @module String
 */
import { Subscriber } from 'rxjs';

/**
 * Takes an input of char codes and returns a method that updates an subscriber
 * with the string value from the char codes
 * @private
 * @param input The array of char codes to convert to a string
 */
export function subscribeToCharCode(input: number | number[]) {
  return (subscriber: Subscriber<string>): void => {
    if (Array.isArray(input)) {
      subscriber.next(String.fromCharCode(...input));
    } else {
      subscriber.next(String.fromCharCode(input));
    }
    subscriber.complete();
  };
}
