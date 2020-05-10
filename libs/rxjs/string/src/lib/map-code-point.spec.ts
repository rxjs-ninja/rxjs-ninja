import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { mapCodePoint } from './map-code-point';

describe('mapCodePoint', () => {
  it('should create a value from an array of values', (done) => {
    of([9731, 9733, 9842])
      .pipe(mapCodePoint(), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('☃★♲'),
        complete: () => done(),
      });
  });
});
