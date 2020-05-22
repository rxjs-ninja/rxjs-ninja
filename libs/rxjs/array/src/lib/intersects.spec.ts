import { of } from 'rxjs';
import { intersects } from './intersects';

describe('intersects', () => {
  it('should return an array of values that intersect', (done) => {
    of(['a', 'b', 'd'])
      .pipe(intersects(['a', 'c']))
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['a']),
        complete: () => done(),
      });
  });

  it('shoud return an array of values that intersect with mutate method', (done) => {
    of([2.1, 1.2])
      .pipe(intersects([2.3, 3.4], Math.floor))
      .subscribe({
        next: (value) => expect(value).toStrictEqual([2.1]),
        complete: () => done(),
      });
  });

  it('should return an Observable array of values that intersect', (done) => {
    of(['a', 'b', 'd'])
      .pipe(intersects(of(['a', 'c']), (val) => val.toUpperCase()))
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['a']),
        complete: () => done(),
      });
  });

  it('should return an Observable array of values that intersect with mutate', (done) => {
    of([2.1, 1.2])
      .pipe(intersects(of([2.3, 3.4]), Math.floor))
      .subscribe({
        next: (value) => expect(value).toStrictEqual([2.1]),
        complete: () => done(),
      });
  });
});
