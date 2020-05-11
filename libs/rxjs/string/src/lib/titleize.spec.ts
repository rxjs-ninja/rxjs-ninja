import { take } from 'rxjs/operators';
import { fromString, titleize } from '@tinynodes/rxjs-string';

describe('titleize', () => {
  it('should titleize a string', (done) => {
    fromString('Mary had a little lamb')
      .pipe(titleize(), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('Mary Had A Little Lamb'),
        complete: () => done(),
      });
  });
});
