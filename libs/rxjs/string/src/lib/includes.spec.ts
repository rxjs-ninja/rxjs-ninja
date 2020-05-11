import { take } from 'rxjs/operators';
import { fromString, includes } from '@tinynodes/rxjs-string';

describe('includes', () => {
  it('should return true if a string includes a query string', (done) => {
    fromString('testing')
      .pipe(includes('test'), take(1))
      .subscribe({
        next: (value) => expect(value).toBeTruthy(),
        complete: () => done(),
      });
  });

  it('should return false if a string does not include a query string', (done) => {
    fromString('test?')
      .pipe(includes('!'), take(1))
      .subscribe({
        next: (value) => expect(value).toBeFalsy(),
        complete: () => done(),
      });
  });
});
