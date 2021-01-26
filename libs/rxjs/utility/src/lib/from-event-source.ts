/**
 * @packageDocumentation
 * @module Utility
 */
import { Observable, Observer } from 'rxjs';

/**
 * Returns an Observable that emits values from an EventSource subscribing to the the passed
 * `eventName` stream.  Takes an optional Observer (e.g. Subject) to emit when the stream opens
 *
 * @category Streams
 *
 * @typeParam T The type of the value in the message `data` property
 *
 * @param source The event source to subscribe to
 * @param eventName The name of the event to listen to, by default this is `message`
 * @param openObserver Optional observer that is emitted when the event source is opened
 * @param signal Optional signal to end the event source
 *
 * @example
 * Subscribe to an EventSource, listen for it opening and provide a stop signal
 * ```ts
 * // The event source emits a time every 1 minute
 * const eventSource = new EventSource('/event-stream');
 * const stopSource = new AbortController();
 * const isOpen$ = new Subject<Event>();
 *
 * function endSource() {
 *   stopSource.abort();
 * }
 *
 * fromEventSource<string>(eventSource, 'message', isOpen$, stopSource.signal).pipe(
 *  tap(value => {
 *    const parsed = JSON.parse(value);
 *    outputSpan.innerHTML = `The time is ${parsed.message}`
 *  }),
 *  finalize(() => {
 *    outputSpan.innerHTML = `EventSource closed`
 *  })
 * ).subscribe();
 * ```
 * Output: `'The time is 12:01', 'The time is 12:02', ....`
 *
 * @returns Observable that emits the `data` value from an EventSource message
 */
export function fromEventSource<T extends unknown>(
  source: EventSource,
  eventName = 'message',
  openObserver?: Observer<Event>,
  signal?: AbortSignal,
): Observable<T> {
  return new Observable<T>((subscriber) => {
    if (signal) {
      signal.onabort = () => {
        source.close();
        !subscriber.closed && subscriber.complete();
      };
    }

    /**
     * @private
     * @internal
     * @param event
     */
    function handleMessage(event: Event) {
      if (!eventName || (eventName && eventName === event.type)) {
        subscriber.next((event as MessageEvent).data);
      }
    }

    /**
     * @private
     * @internal
     * @param event
     */
    function handleError(event: Event) {
      subscriber.error((event as ErrorEvent).message);
    }

    /**
     * @private
     * @internal
     * @param event
     */
    function handleOpen(event: Event) {
      openObserver?.next(event);
      openObserver?.complete();
      source.removeEventListener('open', handleOpen);
    }

    if (openObserver) {
      source.addEventListener('open', handleOpen);
    }

    source.addEventListener(eventName, handleMessage);
    source.addEventListener('error', handleError);

    return () => {
      source.removeEventListener(eventName, handleMessage);
      source.removeEventListener('error', handleError);
      source.removeEventListener('open', handleOpen);

      source.close();
      !subscriber.closed && subscriber.complete();
    };
  });
}
