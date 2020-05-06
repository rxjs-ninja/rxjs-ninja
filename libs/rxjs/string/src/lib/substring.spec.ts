import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { substring } from './substring';

describe('substring', () => {
  it('should return a substring based on a passed start and end', (done) => {
    of('Mary had a little lamb')
      .pipe(substring(0, 4), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('Mary'),
        complete: () => done(),
      });
  });

  it('should return a substring from start position to end of string', (done) => {
    of('Mary had a little lamb')
      .pipe(substring(5), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('had a little lamb'),
        complete: () => done(),
      });
  });
});
