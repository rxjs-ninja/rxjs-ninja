import { from } from 'rxjs';
import { firstTruthy } from '@tinynodes/rxjs-boolean';
import { lastTruthy } from './last-truthy';

describe('firstTruthy', () => {
  it('should return the first true value from a source', (done) => {
    from(['a', 'b', 'c'])
      .pipe(lastTruthy())
      .subscribe({
        next: (value) => expect(value).toBe('c'),
        complete: () => done(),
      });
  });

  it('should return no value if no truthy value', (done) => {
    let called = 0;

    from(['', '', ''])
      .pipe(lastTruthy())
      .subscribe({
        next: () => called++,
        complete: () => {
          expect(called).toBe(0);
          done();
        },
      });
  });

  it('should support return value using a predicate method', (done) => {
    from([1, 2, 3, 4])
      .pipe(lastTruthy((val) => val % 2 === 0))
      .subscribe({
        next: (value) => expect(value).toBe(4),
        complete: () => done(),
      });
  });
});
