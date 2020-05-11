import { take } from 'rxjs/operators';
import { codePointAt, fromString } from '@tinynodes/rxjs-string';

describe('codePointAt', () => {
  it('should return a character code at a passed position', (done) => {
    fromString('☃★♲')
      .pipe(codePointAt(1), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(9733),
        complete: () => done(),
      });
  });
});
