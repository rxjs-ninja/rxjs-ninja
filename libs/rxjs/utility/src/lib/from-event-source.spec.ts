// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import EventSource from 'eventsourcemock';
import { observe } from 'rxjs-marbles/jest';
import { fromEventSource } from '@rxjs-ninja/rxjs-utility';
import { tap } from 'rxjs/operators';

describe('fromEventSource', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'EventSource', {
      value: EventSource,
    });
  });

  it(
    'should create an EventSource',
    observe(() => {
      const source = new window.EventSource('test.js');

      setTimeout(() => {
        source.dispatchEvent(
          new MessageEvent('message', {
            data: 'This is a test',
          }),
        );
      }, 1000);

      return fromEventSource<number>(source).pipe(tap((value) => expect(value).toBe('This is a test')));
    }),
  );
});
