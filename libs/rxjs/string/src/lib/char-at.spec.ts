import { of } from 'rxjs';
import { charAt } from './char-at';
import { take } from 'rxjs/operators';

describe('charAt', () => {
  it('should return a character at a passed position', done => {
    of('test')
      .pipe(charAt(1), take(1))
      .subscribe({
        next: value => expect(value).toBe('e'),
        complete: () => done(),
      });
  });
});
