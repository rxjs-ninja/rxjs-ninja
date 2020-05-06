import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { replace } from './replace';

describe('replace', () => {
  it('should take a string and replace a string pattern', (done) => {
    of('Mary had a little lamb')
      .pipe(replace('lamb', 'dog'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('Mary had a little dog'),
        complete: () => done(),
      });
  });

  it('should take a string and replace a regex pattern', (done) => {
    of('Mary had a little lamb')
      .pipe(replace(/lamb/gi, 'dog'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('Mary had a little dog'),
        complete: () => done(),
      });
  });
});
