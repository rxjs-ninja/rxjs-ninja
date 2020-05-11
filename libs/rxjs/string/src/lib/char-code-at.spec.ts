import { take } from 'rxjs/operators';
import { charCodeAt, fromString } from '@tinynodes/rxjs-string';

describe('charCodeAt', () => {
  it('should return a character code at a passed position', (done) => {
    fromString('test')
      .pipe(charCodeAt(1), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(101),
        complete: () => done(),
      });
  });
});
