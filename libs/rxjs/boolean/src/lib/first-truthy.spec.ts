import { from } from 'rxjs';
import { firstTruthy } from './first-truthy';

describe('firstTruthy', () => {
  it('should return the first true value from a source', (done) => {
    from([null, false, '', 'test'])
      .pipe(firstTruthy())
      .subscribe({
        next: (value) => expect(value).toBe('test'),
        complete: () => done(),
      });
  });

  it('should return no value if no truthy value', (done) => {
    let called = 0;

    from([null, false, ''])
      .pipe(firstTruthy())
      .subscribe({
        next: () => called++,
        complete: () => {
          expect(called).toBe(0);
          done();
        },
      });
  });
});
