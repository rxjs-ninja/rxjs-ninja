import { fromString } from './from-string';
import { search } from './search';

describe('search', () => {
  it('should return a match for a string', (done) => {
    fromString('Mary had a little lamb')
      .pipe(search('little'))
      .subscribe({
        next: (value) => expect(value).toBe(11),
        complete: () => done(),
      });
  });

  it('should return a match for a regular expression', (done) => {
    fromString('Mary had a little lamb.')
      .pipe(search(/[^\w\s]/g))
      .subscribe({
        next: (value) => expect(value).toBe(22),
        complete: () => done(),
      });
  });
});
