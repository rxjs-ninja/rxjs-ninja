import { take } from 'rxjs/operators';
import { fromString, lastIndexOf } from '@tinynodes/rxjs-string';

describe('lastIndexOf', () => {
  it('should return the index of a found string', (done) => {
    fromString('A lamb, Mary had a little lamb')
      .pipe(lastIndexOf('lamb'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(26),
        complete: () => done(),
      });
  });

  it('should return the index of a found string when start passed', (done) => {
    fromString('A lamb, Mary had a little lamb')
      .pipe(lastIndexOf('lamb', 10), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(2),
        complete: () => done(),
      });
  });

  it('should return -1 if there is no value found', (done) => {
    fromString('A lamb, Mary had a little lamb')
      .pipe(lastIndexOf('Joe'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(-1),
        complete: () => done(),
      });
  });
});
