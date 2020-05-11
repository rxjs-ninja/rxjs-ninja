import { take } from 'rxjs/operators';
import { charAt, fromString } from '@tinynodes/rxjs-string';

describe('charAt', () => {
  it('should return a character at a passed position', (done) => {
    fromString('test')
      .pipe(charAt(1), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('e'),
        complete: () => done(),
      });
  });
});
