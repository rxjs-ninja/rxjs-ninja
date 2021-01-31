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
 * @param options Options for the connection - default is `baudRate` of `9600`
 * @param signal Optional signal to end the source
 *
 * @returns Observable that emits the output from a serial source
 */
export function fromWebSerial(
  port: SerialPort,
  writerSource?: Observable<Uint8Array>,
  options: SerialOptions = { baudRate: 9600 },
  signal?: AbortSignal,
): Observable<Uint8Array> {
  return new Observable<Uint8Array>((subscriber) => {
    console.log('new subscription');
    const closeStreams$ = new Subject<void>();

    from(port.open(options))
      .pipe(
        tap(() => {
          let reader: ReadableStreamDefaultReader<Uint8Array>;
          let writer: WritableStreamDefaultWriter<Uint8Array>;

          closeStreams$
            .asObservable()
            .pipe(
              tap(async () => {
                console.log('here');
                await writer.close();
                //writer.releaseLock();
                await reader.cancel();
                //reader.releaseLock();
                await port.close();
                !subscriber.closed && subscriber.complete();
              }),
            )
            .subscribe();

          if (writerSource && port.writable) {
            writer = port.writable.getWriter();

            writerSource
              .pipe(
                takeUntil(closeStreams$),
                toWritableStream(writer, signal),
                catchError((err) => {
                  subscriber.error(err);
                  return EMPTY;
                }),
              )
              .subscribe();
          }

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

          const process = async (
            result: ReadableStreamReadResult<Uint8Array>,
          ): Promise<ReadableStreamReadResult<Uint8Array>> => {
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
