import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { indexOf } from './index-of';
import { lastIndexOf } from './last-index-of';

describe('indexOf', () => {
  it('should return the index of a found string', (done) => {
    of('A lamb, Mary had a little lamb')
      .pipe(lastIndexOf('lamb'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(26),
        complete: () => done(),
      });
  });

  it('should return the index of a found string when start passed', (done) => {
    of('A lamb, Mary had a little lamb')
      .pipe(indexOf('lamb', 5), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(26),
        complete: () => done(),
      });
  });

  it('should return -1 if there is no value found', (done) => {
    of('A lamb, Mary had a little lamb')
      .pipe(indexOf('Joe'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(-1),
        complete: () => done(),
      });
  });
});
