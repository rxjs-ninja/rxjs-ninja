import { marbles } from 'rxjs-marbles';
import { tap } from 'rxjs/operators';
import { takeUntilSignal } from './take-until-signal';

describe('takeUntilSignal', () => {
  it(
    'should end subscription on signal',
    marbles((m) => {
      let count = 0;
      const stop = new AbortController();

      const input = m.hot('-a-b-c-d-e-|', { a: 'A', b: 'B', c: 'C', d: 'D', e: 'E' });
      const subs = '^------!';
      const expected = m.cold('-a-b-c-|', {
        a: 'A',
        b: 'B',
        c: 'C',
      });
      m.expect(
        input.pipe(
          takeUntilSignal(stop.signal),
          tap(() => {
            if (count === 3) {
              stop.abort();
            } else {
              count++;
            }
          }),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
