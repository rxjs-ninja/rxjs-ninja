import { take } from 'rxjs/operators';
import { fromString, indexOf } from '@tinynodes/rxjs-string';

describe('indexOf', () => {
  it('should return the index of a found string', (done) => {
    fromString('foobar barfoo')
      .pipe(indexOf('foo'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(0),
        complete: () => done(),
      });
  });

  it('should return the index of a found string when start passed', (done) => {
    fromString('foobar barfoo')
      .pipe(indexOf('foo', 1), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(10),
        complete: () => done(),
      });
  });

  it('should return -1 if there is no value found', (done) => {
    fromString('foobar barfoo')
      .pipe(indexOf('fizzbuzz'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(-1),
        complete: () => done(),
      });
  });
});
