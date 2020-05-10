import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { mapCharCode } from './map-char-code';

describe('mapCharCode', () => {
  it('should create a value from an array of values', (done) => {
    of([35, 36, 37, 38])
      .pipe(mapCharCode(), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('#$%&'),
        complete: () => done(),
      });
  });
});
