import { from } from 'rxjs';
import { isSafeInteger } from './is-safe-integer';

describe('isSafeInteger', () => {
  it('should return if a value is a safe integer', done => {
    const output = [];
    from([Math.pow(2, 53), Math.pow(2, 53) - 1])
      .pipe(isSafeInteger())
      .subscribe({
        next: value => output.push(value),
        complete: () => {
          expect(output).toStrictEqual([false, true]);
          done();
        },
      });
  });
});
