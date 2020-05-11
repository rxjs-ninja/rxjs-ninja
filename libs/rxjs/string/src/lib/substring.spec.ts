import { take } from 'rxjs/operators';
import { fromString, substring } from '@tinynodes/rxjs-string';

describe('substring', () => {
  it('should return a substring based on a passed start and end', (done) => {
    fromString('Mary had a little lamb')
      .pipe(substring(0, 4), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('Mary'),
        complete: () => done(),
      });
  });

  it('should return a substring from start position to end of string', (done) => {
    fromString('Mary had a little lamb')
      .pipe(substring(5), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('had a little lamb'),
        complete: () => done(),
      });
  });
});
