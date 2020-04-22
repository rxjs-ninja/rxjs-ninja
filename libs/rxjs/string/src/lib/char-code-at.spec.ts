import { of } from 'rxjs';
import { charCodeAt } from './char-code-at';
import { take } from 'rxjs/operators';

describe('charCodeAt', () => {
  it('should return a character code at a passed position', done => {
    of('test')
      .pipe(charCodeAt(1), take(1))
      .subscribe({
        next: value => expect(value).toBe(101),
        complete: () => done(),
      });
  });
});
