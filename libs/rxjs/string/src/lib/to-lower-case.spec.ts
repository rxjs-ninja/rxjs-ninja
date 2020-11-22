import { toLowerCase } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('toLowerCase', () => {
  it(
    'should take a string and convert to lower case',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'HELLO', b: 'TestinG', c: 'fOOBAr' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'hello', y: 'testing', z: 'foobar' });
      m.expect(input.pipe(toLowerCase())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should take a string and convert to lower case with locale',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'HËLLO', b: 'TëstinG', c: 'fOOBÄr' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'hëllo', y: 'tësting', z: 'foobär' });
      m.expect(input.pipe(toLowerCase('de-DE'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
