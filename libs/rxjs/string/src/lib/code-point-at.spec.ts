import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { codePointAt } from './code-point-at';

describe('codePointAt', () => {
  it('should return a character code at a passed position', (done) => {
    of('☃★♲')
      .pipe(codePointAt(1), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(9733),
        complete: () => done(),
      });
  });
});
