import { take } from 'rxjs/operators';
import { fromString, startsWith } from '@tinynodes/rxjs-string';

describe('startsWith', () => {
  it('should return true if a string starts with a character', (done) => {
    fromString('test?')
      .pipe(startsWith('t'), take(1))
      .subscribe({
        next: (value) => expect(value).toBeTruthy(),
        complete: () => done(),
      });
  });

  it('should return false if a string does not start with a character', (done) => {
    fromString('test?')
      .pipe(startsWith('?'), take(1))
      .subscribe({
        next: (value) => expect(value).toBeFalsy(),
        complete: () => done(),
      });
  });
});
