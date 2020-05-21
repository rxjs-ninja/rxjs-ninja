import { of } from 'rxjs';
import { intersects } from './intersects';
import { difference } from './difference';

describe('difference', () => {
  it('should return an array of values that intersect', (done) => {
    of(['a', 'b', 'd'])
      .pipe(difference(['a', 'c']))
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['b', 'd']),
        complete: () => done(),
      });
  });

  it('should return an array of values that intersect with mutate method', (done) => {
    of([2.1, 1.2])
      .pipe(difference([2.3, 3.4], Math.floor))
      .subscribe({
        next: (value) => expect(value).toStrictEqual([1.2]),
        complete: () => done(),
      });
  });

  it('should return an Observable array of values that intersect', (done) => {
    of(['a', 'b', 'd'])
      .pipe(difference(of(['a', 'c']), (val) => val.toUpperCase()))
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['b', 'd']),
        complete: () => done(),
      });
  });

  it('should return an Observable array of values that intersect with mutate', (done) => {
    of([2.1, 1.2])
      .pipe(difference(of([2.3, 3.4]), Math.floor))
      .subscribe({
        next: (value) => expect(value).toStrictEqual([1.2]),
        complete: () => done(),
      });
  });
});
