import { take } from 'rxjs/operators';
import { fromString, lastIndexOf } from '@tinynodes/rxjs-string';

describe('lastIndexOf', () => {
  it('should return the index of a found string', (done) => {
    fromString('foobar barfoo')
      .pipe(lastIndexOf('foo'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(10),
        complete: () => done(),
      });
  });

  it('should return the index of a found string when start passed', (done) => {
    fromString('foobar barfoo')
      .pipe(lastIndexOf('foo', 2), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(0),
        complete: () => done(),
      });
  });

  it('should return -1 if there is no value found', (done) => {
    fromString('foobar barfoo')
      .pipe(lastIndexOf('fizzbuzz'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(-1),
        complete: () => done(),
      });
  });
});
