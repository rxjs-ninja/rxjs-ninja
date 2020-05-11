import { take } from 'rxjs/operators';
import { fromString, replace } from '@tinynodes/rxjs-string';

describe('replace', () => {
  it('should take a string and replace a string pattern', (done) => {
    fromString('Mary had a little lamb')
      .pipe(replace('lamb', 'dog'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('Mary had a little dog'),
        complete: () => done(),
      });
  });

  it('should take a string and replace a regex pattern', (done) => {
    fromString('Mary had a little lamb')
      .pipe(replace(/lamb/gi, 'dog'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('Mary had a little dog'),
        complete: () => done(),
      });
  });
});
