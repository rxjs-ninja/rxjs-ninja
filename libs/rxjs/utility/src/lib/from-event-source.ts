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
 * @param options Optional options for the EventSource object
 * @param signal Optional signal to
 */
export function fromEventSource<T extends unknown>(
  source: EventSource,
  eventName = 'message',
  options?: EventSourceInit,
  signal?: AbortSignal,
): Observable<T>  {
  return new Observable<T>((subscriber) => {

    if (signal) {
      signal.onabort = () => {
        subscriber.complete();
      };
    }

    source.addEventListener(eventName, (event: Event) => {
      subscriber.next((event as MessageEvent).data as T);
    });

    source.addEventListener('error', (event: Event) => {
      subscriber.error(event);
    });

    return () => {
      source.close();
      !subscriber.closed && subscriber.complete();
    };
  });
}
