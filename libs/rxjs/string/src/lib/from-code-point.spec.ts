import { from } from 'rxjs';
import { reduce, take } from 'rxjs/operators';
import { fromCodePoint } from './from-code-point';

describe('fromCodePoint', () => {
  it('should create a value from an array of values', (done) => {
    from([9731, 9733, 9842])
      .pipe(
        reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        fromCodePoint(),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toBe('☃★♲'),
        complete: () => done(),
      });
  });
});
