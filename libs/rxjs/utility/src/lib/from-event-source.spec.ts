// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fromEventSource } from './from-event-source';
import { BehaviorSubject, of } from 'rxjs';
import { observe } from 'rxjs-marbles/jest';
import { catchError, finalize, reduce, take, tap, withLatestFrom } from 'rxjs/operators';

describe('fromEventSource', () => {
  let source: EventSource;

  beforeAll(() => {
    Object.defineProperty(window, 'EventSource', {
      value: EventSource,
    });
  });

  beforeEach(() => {
    source = new EventSource('test.js');
    //source['test.js'].emitOpen();
  });

  it(
    'should subscribe to a default event source message',
    observe(() => {
      const event = new MessageEvent('message', {
        data: '{"value": "This is a test"}',
      });

      setTimeout(() => {
        source.dispatchEvent(event);
      }, 1000);

      return fromEventSource<Record<string, string>>(source).pipe(
        take(1),
        tap((result) => expect(result).toBe('{"value": "This is a test"}')),
      );
    }),
  );

  it(
    'should end on a passed signal',
    observe(() => {
      const event = new MessageEvent('message', {
        data: '{"value": "This is a test"}',
      });

      const stop = new AbortController();

      setTimeout(() => {
        source.dispatchEvent(event);
        source.dispatchEvent(event);
        source.dispatchEvent(event);
        source.dispatchEvent(event);
        stop.abort();
        source.dispatchEvent(event);
        source.dispatchEvent(event);
      }, 1000);

      let count = 0;
      return fromEventSource<Record<string, string>>(source, undefined, undefined, stop.signal).pipe(
        reduce((a) => a + 1, 0),
        tap((value) => (count = value)),
        finalize(() => {
          expect(count).toBe(4);
        }),
      );
    }),
  );

  it(
    'should subscribe to a custom event source message',
    observe(() => {
      const event1 = new MessageEvent('foobar', {
        data: '{"value": "This is a foobar test"}',
      });

      const event2 = new MessageEvent('custom', {
        data: '{"value": "This is a custom test"}',
      });

      setTimeout(() => {
        source.dispatchEvent(event1);
        source.dispatchEvent(event2);
      }, 1000);

      return fromEventSource<Record<string, string>>(source, 'custom').pipe(
        take(1),
        tap((result) => expect(result).toBe('{"value": "This is a custom test"}')),
      );
    }),
  );

  xit(
    'should signal when the event emitter has been opened',
    observe(() => {
      const event = new MessageEvent('message', {
        data: '{"value": "This is a test"}',
      });

      setTimeout(() => {
        source.dispatchEvent(event);
      }, 1000);

      const opened$ = new BehaviorSubject<any>(undefined);

      return fromEventSource<Record<string, string>>(source, 'message', opened$).pipe(
        take(1),
        withLatestFrom(opened$.asObservable()),
        tap(([message, opened]) => {
          expect(opened).toBeInstanceOf(Event);
        }),
      );
    }),
  );

  xit(
    'should emit an error if thrown from the emitter',
    observe(() => {
      setTimeout(() => {
        //source.dispatchEvent(new Error('This is an error'))
      }, 1000);

      return fromEventSource<Record<string, string>>(source).pipe(
        catchError((err) => {
          expect(err).toBeInstanceOf(Error);
          return of(true);
        }),
      );
    }),
  );
});
