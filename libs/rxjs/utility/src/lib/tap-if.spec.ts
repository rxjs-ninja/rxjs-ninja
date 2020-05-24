import { from, of } from 'rxjs';
import { tapIf } from './tap-if';

describe('tapIf', () => {
  it('should call tap if the predicate passes as true', (done) => {
    const predicate = (value: string | number) => typeof value === 'string';
    let called = 0;

    from([1, '2', 3])
      .pipe(tapIf<string | number>(predicate, () => called++))
      .subscribe({
        complete: () => {
          expect(called).toBe(1);
          done();
        },
      });
  });

  it('should not call tap if the predicate passes as false', (done) => {
    const predicate = (value: string | number) => typeof value !== 'string';
    let called = 0;

    from([1, '2', 3])
      .pipe(tapIf(predicate, () => called++))
      .subscribe({
        complete: () => {
          expect(called).toBe(2);
          done();
        },
      });
  });
});
