import { from } from 'rxjs';
import { fromIsSafeInteger } from './from-is-safe-integer';

describe('fromIsSafeInteger', () => {
  it('should return true for an integer', (done) => {
    const output = [];

    from([1, 2, Math.pow(2, 53), Math.pow(2, 53) - 1])
      .pipe(fromIsSafeInteger())
      .subscribe({
        next: (value) => output.push(value),
        complete: () => {
          expect(output).toStrictEqual([1, 2, 9007199254740991]);
          done();
        },
      });
  });
});
