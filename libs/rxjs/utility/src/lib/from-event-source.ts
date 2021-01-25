/**
 * @packageDocumentation
 * @module Utility
 */
import { Observable } from 'rxjs';

/**
 * Returns an Observable that emits values from an EventSource of the passed `eventName`
 *
 * @category Streams
 *
 * @param source The URL of the EventStream to connect to
 * @param eventName The name of the event to listen to, by default this is `message`
 * @param signal Optional signal to
 */
export function fromEventSource<T extends unknown>(
  source: EventSource,
  eventName = 'message',
  signal?: AbortSignal,
): Observable<MessageEvent<T>> {
  return new Observable<MessageEvent<T>>((subscriber) => {
    if (signal) {
      signal.onabort = () => {
        source.close();
        subscriber.complete();
      };
    }

    function handleMessage(event: Event) {
      if (!eventName) {
        subscriber.next(event as MessageEvent<T>);
      } else if (eventName && eventName === event.type) {
        subscriber.next(event as MessageEvent<T>);
      }
    }

    function handleError(event: Event) {
      subscriber.error(event as MessageEvent<T>);
    }

    source.addEventListener(eventName, handleMessage);
    source.addEventListener('error', handleError);

    return () => {
      source.removeEventListener(eventName, handleMessage);
      source.removeEventListener('error', handleError);
      source.close();
      !subscriber.closed && subscriber.complete();
    };
  });
}
