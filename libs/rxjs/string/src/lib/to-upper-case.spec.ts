import { toUpperCase } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('toUpperCase', () => {
  it(
    'should take a string and convert to upper case',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'hello', b: 'TestinG', c: 'fOOBAr' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'HELLO', y: 'TESTING', z: 'FOOBAR' });
      m.expect(input.pipe(toUpperCase())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should take a string and convert to upper case with locale',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'hëllo', b: 'TëstinG', c: 'fOOBÄr' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'HËLLO', y: 'TËSTING', z: 'FOOBÄR' });
      m.expect(input.pipe(toUpperCase('de-DE'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
