// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import EventSource, { sources } from 'eventsourcemock';
import { observe } from 'rxjs-marbles/jest';
import { fromEventSource } from '@rxjs-ninja/rxjs-utility';
import { catchError, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

describe('fromEventSource', () => {
  let source: EventSource;

  beforeAll(() => {
    Object.defineProperty(window, 'EventSource', {
      value: EventSource,
    });
  });

  beforeEach(() => {
    source = new EventSource('test.js');
    sources['test.js'].emitOpen();
  });

  it(
    'should subscribe to a default event source message',
    observe(() => {
      const event = new MessageEvent('message', {
        data: 'This is a test',
      });

      setTimeout(() => {
        sources['test.js'].emit(event.type, event);
      }, 1000);

      return fromEventSource<string>(source).pipe(
        take(1),
        tap((value) => expect(value.data).toBe('This is a test')),
      );
    }),
  );

  it(
    'should subscribe to a custom event source message',
    observe(() => {
      const event1 = new MessageEvent('foobar', {
        data: 'Foobar event',
      });

      const event2 = new MessageEvent('custom', {
        data: 'This is a test',
      });

      setTimeout(() => {
        sources['test.js'].emit(event1.type, event1);
        sources['test.js'].emit(event2.type, event2);
      }, 1000);

      return fromEventSource<string>(source, 'custom').pipe(
        take(1),
        tap((value) => expect(value.data).toBe('This is a test')),
      );
    }),
  );

  it(
    'should emit an error if thrown from the emitter',
    observe(() => {
      const event = new MessageEvent('error', {
        data: 'This is an error'
      });

      setTimeout(() => {
        sources['test.js'].emit(event.type, event);
      }, 1000);

      return fromEventSource<string>(source).pipe(
        catchError((err) => {
          expect(err).toBe('This is a error');
          return of(true);
        }),
      );
    }),
  );
});
