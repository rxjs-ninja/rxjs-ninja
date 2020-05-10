import { from, of } from 'rxjs';
import { reduce, take } from 'rxjs/operators';
import { filterCharCode } from './filter-char-code';

describe('filterCharCode', () => {
  it('should create a value from an array of values', (done) => {
    of([35, 36, 37, 38])
      .pipe(filterCharCode(), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('#$%&'),
        complete: () => done(),
      });
  });
});
