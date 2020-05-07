import { of } from 'rxjs';
import { titleize } from './titleize';
import { take } from 'rxjs/operators';

describe('titleize', () => {
  it('should titleize a string', (done) => {
    of('Mary had a little lamb')
      .pipe(titleize(), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('Mary Had A Little Lamb'),
        complete: () => done(),
      });
  });
});
