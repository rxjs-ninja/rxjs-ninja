import { map, reduce, take } from 'rxjs/operators';
import { fromNumber } from '@tinynodes/rxjs-number';

describe('fromNumber', () => {
  it('should return a Observable number from a passed number', (done) => {
    fromNumber(6)
      .pipe(
        map((val) => val * 7),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toBe(42),
        complete: () => done(),
      });
  });

  it('should return an Observable numbers from passed array', (done) => {
    fromNumber([1, 2, 3])
      .pipe(
        reduce((acc, val) => acc + val),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toBe(6),
        complete: () => done(),
      });
  });
});