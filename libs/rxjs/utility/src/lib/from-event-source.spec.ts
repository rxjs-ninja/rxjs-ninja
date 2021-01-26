// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import EventSource, { sources } from 'eventsourcemock';
import { observe } from 'rxjs-marbles/jest';
import { fromEventSource } from '@rxjs-ninja/rxjs-utility';
import { catchError, take, tap, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

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
        data: '{"value": "This is a test"}',
      });

      setTimeout(() => {
        sources['test.js'].emit(event.type, event);
      }, 1000);

      return fromEventSource<Record<string, string>>(source).pipe(
        take(1),
        tap((result) => expect(result).toBe('{"value": "This is a test"}')),
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
        sources['test.js'].emit(event1.type, event1);
        sources['test.js'].emit(event2.type, event2);
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
        sources['test.js'].emitOpen();
        sources['test.js'].emit(event.type, event);
      }, 1000);

      const opened$ = new BehaviorSubject<any>(undefined);

      return fromEventSource<Record<string, string>>(source, 'message', opened$).pipe(
        take(1),
        withLatestFrom(opened$.asObservable()),
        tap(([message, opened]) => {
          console.log('opened', message, opened);
          expect(opened).toBeInstanceOf(Event);
        }),
      );

      //return opened$.asObservable().pipe(tap((value) => );
    }),
  );

  xit(
    'should emit an error if thrown from the emitter',
    observe(() => {
      source = new EventSource('test');

      return fromEventSource<Record<string, string>>(source).pipe(
        catchError((err) => {
          expect(err).toBe('This is a error');
          return of(true);
        }),
      );
    }),
  );
});
