import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { filterCodePoint } from './filter-code-point';

describe('filterCodePoint', () => {
  it('should create a value from an array of values', (done) => {
    of([9731, 9733, 9842])
      .pipe(filterCodePoint(), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('☃★♲'),
        complete: () => done(),
      });
  });
});
