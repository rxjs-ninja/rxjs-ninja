/**
 * @packageDocumentation
 * @module Utility
 */
/* istanbul ignore file */
import { EMPTY, from, Observable, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';
import { toWritableStream } from './to-writable-stream';

/**
 * Returns an Observable that emits the response from a source connected to via the
 * {@link https://reillyeon.github.io/serial|Web Serial API}. The function can also accept an Observable
 * that emits values to write to the serial device, allowing two-way communication.
 *
 * Both the input and output values must be
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array|Uint8Array}, you
 * can use {@link https://developer.mozilla.org/en-us/docs/Web/API/TextEncoder|TextEncoder} and
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder|TextDecoder} to convert between strings, which
 * can  be seen in the demo
 *
 * The function will also handle opening and closing of the port from the serial device when using an `AbortSignal` or
 * ending the RxJS subscription.
 *
 * @category Streams
 *
 * @remarks Web Serial is available in Chrome or Edge 89 or later, in earlier versions it can be enabled using the
 *   experimental web features flag. To use the feature is **must** be invoked with a user action such as a user
 *   button click, and in a browser location that provides an acceptable policy before the port can be opened by this
 *   operator.
 *
 * @see {@link https://rxjs-from-web-serial.stackblitz.io|RxJS Web Serial Demo}
 * @see {@link https://stackblitz.com/edit/rxjs-from-web-serial|Demo Source}
 *
 * @param port The SerialPort object to connect to
 * @param writerSource Optional Observable source to emit values to the serial connection writer
 * @param options Options for the connection - if none passed a default `baudRate` of `9600` is set
 * @param signal Optional signal to end the source
 *
 * @returns Observable that emits the output from a serial source
 */
export function fromWebSerial(
  port: SerialPort,
  writerSource?: Observable<Uint8Array>,
  options?: SerialOptions,
  signal?: AbortSignal,
): Observable<Uint8Array> {
  return new Observable<Uint8Array>((subscriber) => {
    const closeStreams$ = new Subject<void>();
    let reader: ReadableStreamDefaultReader<Uint8Array>;
    let writer: WritableStreamDefaultWriter<Uint8Array>;

    // Allow for undefined options
    from(port.open(options || { baudRate: 9600 }))
      .pipe(
        tap(() => {
          /**
           * The next block deals specifically with handling the closing of all internal and external streams
           */
          closeStreams$
            .asObservable()
            .pipe(
              tap(async () => {
                await writer.close();
                await reader.cancel();
                await port.close();
                !subscriber.closed && subscriber.complete();
              }),
            )
            .subscribe();

          if (signal) {
            signal.onabort = () => {
              closeStreams$.next();
              closeStreams$.complete();
            };
          }

          port.ondisconnect = () => {
            closeStreams$.next();
            closeStreams$.complete();
          };

          /**
           * Set up the writer to the serial device
           */
          if (writerSource && port.writable) {
            writer = port.writable.getWriter();

            writerSource
              .pipe(
                takeUntil(closeStreams$),
                toWritableStream(writer),
                catchError((err) => {
                  subscriber.error(err);
                  return EMPTY;
                }),
              )
              .subscribe();
          }

          /**
           * Loop over the promise response from the reader until it's done or the port is no longer readable
           * @private
           * @internal
           * @param result
           */
          const process = async (
            result: ReadableStreamDefaultReadResult<Uint8Array>,
          ): Promise<ReadableStreamDefaultReadResult<Uint8Array>> => {
            subscriber.next(result.value);
            return !result.done || !port.readable ? reader.read().then(process) : Promise.resolve(result);
          };

          if (port.readable) {
            reader = port.readable.getReader();
            from(reader.read())
              .pipe(
                takeUntil(closeStreams$),
                switchMap((result) => process(result)),
              )
              .subscribe();
          }
        }),
        catchError((err) => {
          subscriber.error(err);
          return EMPTY;
        }),
      )
      .subscribe();

    return () => {
      closeStreams$.next();
      closeStreams$.complete();
    };
  });
}
