import { EMPTY, from, Observable, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { toWritableStream } from './to-writable-stream';

/**
 * Returns an Observable that emits the response from a source connected to via the
 * {@link https://reillyeon.github.io/serial|Web Serial API}
 *
 * @remarks Web Serial is available in Chrome or Edge 89 or later, in earlier versions it can be enabled using the
 *   experimental web features flag. To use the feature is **must** be invoked with a user action such as a user
 *   button click before the port can be opened by this operator.
 *
 * @see {@link https://rxjs-from-web-serial.stackblitz.io|RxJS Web Serial Demo}
 *
 * @typeParam O The type output from the SerialPort device
 * @typeParam I The type of input value from the writer to the device
 *
 * @param port The SerialPort object to connect to
 * @param writerSource Optional Observable source to emit values to the serial connection writer
 * @param options Options for the connection - default is `baudRate` of `9600`
 * @param signal Optional signal to end the source
 *
 * @returns Observable that emits the output from a serial source
 */
export function fromWebSerial<I extends unknown>(
  port: SerialPort,
  writerSource?: Observable<I>,
  options: SerialOptions = { baudRate: 9600 },
  signal?: AbortSignal,
): Observable<Uint8Array> {
  return new Observable<Uint8Array>((subscriber) => {
    from(port.open(options))
      .pipe(
        tap(() => {
          let writer: WritableStreamDefaultWriter<I>;
          let writerEnd: Promise<void>;
          let reader: ReadableStreamDefaultReader<Uint8Array>;
          const closeStreams$ = new Subject<void>();

          closeStreams$
            .pipe(
              tap(async () => {
                if (writer) {
                  await writer.close();
                  await writerEnd;
                  writer.releaseLock();
                }
                if (reader) {
                  reader.releaseLock();
                }
              }),
            )
            .subscribe();

          if (writerSource && port.writable) {
            const encoder = new TextEncoderStream();
            writerEnd = encoder.readable.pipeTo(port.writable);
            const outputStream = encoder.writable;

            const writer: WritableStreamDefaultWriter = outputStream.getWriter();
            writerSource.pipe(takeUntil(closeStreams$), toWritableStream(writer, signal)).subscribe();
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
            reader.read().then(process);
          }
        }),
        catchError((err) => {
          subscriber.error(err);
          return EMPTY;
        }),
      )
      .subscribe();
  });
}
