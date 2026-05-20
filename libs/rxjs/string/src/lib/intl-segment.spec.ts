import { marbles } from 'rxjs-marbles/jest';
import { intlSegment } from './intl-segmenter';

describe('intlSegment', () => {
  it(
    'should segment text by locale rules',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'hello' });
      const subs = '^--!';
      const expected = m.cold('-s-|', { s: ['hello'] });
      m.expect(input.pipe(intlSegment('en', { granularity: 'word' }))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});