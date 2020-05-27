/**
 * @packageDocumentation
 * @module string
 */
import { Subscriber } from 'rxjs';
import { FormType } from '../types/normalize';

/**
 * Takes an input of number and returns a method that updates an subscriber
 * @private
 * @param input The number to subscribe to
 * @param form
 */
export const subscribeToSingleOrArrayUnicode = (input: string | string[], form: FormType) => (
  subscriber: Subscriber<string>,
) => {
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      subscriber.next(input[i].normalize(form));
    }
  } else {
    subscriber.next(input.normalize(form));
  }
  subscriber.complete();
};
