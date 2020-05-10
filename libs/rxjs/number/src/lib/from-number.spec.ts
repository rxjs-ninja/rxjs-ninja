import { take } from 'rxjs/operators';
import { fromNumber } from './from-number';

describe('fromString', () => {
  it('should return a Observable number from a passed number', (done) => {
    fromNumber(6 * 7)
      .pipe(take(1))
      .subscribe({
        next: (value) => expect(value).toBe(42),
        complete: () => done(),
      });
  });
});
