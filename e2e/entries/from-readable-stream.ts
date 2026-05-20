import { firstValueFrom } from 'rxjs';
import { catchError, reduce } from 'rxjs/operators';
import { of } from 'rxjs';
import { fromReadableStream } from '../../libs/rxjs/utility/src/lib/from-readable-stream';

function createNumberStream(): ReadableStream<number> {
  return new ReadableStream<number>({
    start(controller) {
      for (let i = 0; i < 100; i++) {
        controller.enqueue(i);
      }
      controller.close();
    },
  });
}

export async function sumStream(): Promise<number> {
  return firstValueFrom(fromReadableStream<number>(createNumberStream()).pipe(reduce((a, b) => a + b, 0)));
}

export async function sumUntilAbort(): Promise<number> {
  const abort = new AbortController();
  const signal = abort.signal;
  const stream = createNumberStream();

  return firstValueFrom(
    fromReadableStream<number>(stream, signal).pipe(
      reduce((acc, val) => {
        if (val === 50) {
          abort.abort();
        }
        return acc + val;
      }, 0),
    ),
  );
}

export async function sumWithQueueStrategy(): Promise<number> {
  const stream = createNumberStream();
  const queue = new CountQueuingStrategy({ highWaterMark: 10 });
  return firstValueFrom(fromReadableStream<number>(stream, undefined, queue).pipe(reduce((a, b) => a + b, 0)));
}

export async function abortThrows(): Promise<string> {
  const abort = new AbortController();
  const signal = abort.signal;
  const stream = createNumberStream();

  try {
    await firstValueFrom(
      fromReadableStream<number>(stream, signal, undefined, true).pipe(
        reduce((acc, val) => {
          if (val === 50) {
            abort.abort();
          }
          return acc + val;
        }, 0),
      ),
    );
    return '';
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}
