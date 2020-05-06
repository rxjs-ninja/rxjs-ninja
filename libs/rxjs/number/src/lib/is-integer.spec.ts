import { from } from 'rxjs';
import { isInteger } from './is-integer';
import { filter } from 'rxjs/operators';

describe('isInteger', () => {
  it('should return true for an integer', (done) => {
    const output = [];

    from([1, 2, 3.14, '2', false, true, null])
      .pipe(isInteger(), filter(Boolean))
      .subscribe({
        next: (value) => output.push(value),
        complete: () => {
          expect(output).toHaveLength(2);
          done();
        },
      });
  });
});
