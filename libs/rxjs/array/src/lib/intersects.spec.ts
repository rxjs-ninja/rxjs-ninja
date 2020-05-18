import { of } from 'rxjs';
import { intersects } from './intersects';

describe('intersectsBy', () => {
  it('should return an array of string items that intersect', (done) => {
    of(['a', 'b', 'c', 'd'])
      .pipe(intersects(['a', 'c'], (val) => val.toUpperCase()))
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['a', 'c']),
        complete: () => done(),
      });
  });

  it('should return an array of string items that intersect', (done) => {
    of([2.1, 1.2])
      .pipe(intersects([2.3, 3.4], Math.floor))
      .subscribe({
        next: (value) => expect(value).toStrictEqual([2.1]),
        complete: () => done(),
      });
  });
});
