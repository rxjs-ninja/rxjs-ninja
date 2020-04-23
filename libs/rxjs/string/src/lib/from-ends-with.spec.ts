import { from, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { endsWith } from './ends-with';
import { filterTruthy } from '@tinynodes/rxjs-boolean';

describe('fromEndsWith', () => {
  it('should return a string if a string ends with a character', done => {
    const output = [];

    from(['test?', 'foo', 'bar?'])
      .pipe(endsWith('?'), take(3), filterTruthy())
      .subscribe({
        next: value => output.push(value),
        complete: () => {
          expect(output).toHaveLength(2);
          done();
        },
      });
  });

  it('should return false if a string does not end with a character', done => {
    const output = [];

    from(['test', 'foo', 'bar'])
      .pipe(endsWith('!'), take(3), filterTruthy())
      .subscribe({
        next: value => output.push(value),
        complete: () => {
          expect(output).toHaveLength(0);
          done();
        },
      });
  });
});
