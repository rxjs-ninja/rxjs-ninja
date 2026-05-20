import { marbles } from 'rxjs-marbles/jest';
import {
  asciiLowerCase,
  asciiUpperCase,
  coerceString,
  fromStringRaw,
  intlCollatorCompare,
  intlListFormat,
  intlSegment,
  localeCompare,
  stringAt,
} from '@rxjs-ninja/rxjs-string';

describe('string gap operators', () => {
  it(
    'coerceString, fromStringRaw, casing, stringAt',
    marbles((m) => {
      m.expect(m.hot('-a-|', { a: 42 }).pipe(coerceString())).toBeObservable(m.cold('-x-|', { x: '42' }));
      m.expect(fromStringRaw`line1\nline2`).toBeObservable(m.cold('(x|)', { x: 'line1\\nline2' }));
      m.expect(m.hot('-a-|', { a: 'AbC' }).pipe(asciiLowerCase())).toBeObservable(m.cold('-x-|', { x: 'abc' }));
      m.expect(m.hot('-a-|', { a: 'AbC' }).pipe(asciiUpperCase())).toBeObservable(m.cold('-x-|', { x: 'ABC' }));
      m.expect(m.hot('-a-|', { a: 'RxJS' }).pipe(stringAt(0))).toBeObservable(m.cold('-x-|', { x: 'R' }));
    }),
  );

  it(
    'localeCompare and Intl helpers',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'b' });
      m.expect(input.pipe(localeCompare('a'))).toBeObservable(m.cold('-p-|', { p: 1 }));
      m.expect(input.pipe(intlCollatorCompare('a', 'en'))).toBeObservable(m.cold('-p-|', { p: 1 }));
      m.expect(m.hot('-a-|', { a: 'hello' }).pipe(intlSegment('en', { granularity: 'word' }))).toBeObservable(
        m.cold('-s-|', { s: ['hello'] }),
      );
      m.expect(m.hot('-a-|', { a: ['a', 'b', 'c'] }).pipe(intlListFormat('en'))).toBeObservable(
        m.cold('-l-|', { l: 'a, b, and c' }),
      );
    }),
  );
});
