import { take } from 'rxjs/operators';
import { concat, fromString } from '@tinynodes/rxjs-string';
import { of } from 'rxjs';

describe('concat', () => {
  it('should concatenate a string from a source', (done) => {
    fromString('test')
      .pipe(concat('ing'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('testing'),
        complete: () => done(),
      });
  });

  it('should concatenate a string from a source and multiple arguments', (done) => {
    fromString('test')
      .pipe(concat('ing', ' ', 'is fun'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('testing is fun'),
        complete: () => done(),
      });
  });

  it('should concatenate a string from a source from an array argument', (done) => {
    fromString('test')
      .pipe(concat(['ing', ' ', 'is fun']), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('testing is fun'),
        complete: () => done(),
      });
  });

  it('should concatenate a string from a source from Observable array argument', (done) => {
    fromString('test')
      .pipe(concat(of(['ing', ' ', 'is fun'])), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('testing is fun'),
        complete: () => done(),
      });
  });
});
