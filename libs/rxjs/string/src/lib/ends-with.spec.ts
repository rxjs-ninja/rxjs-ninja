import { take } from 'rxjs/operators';
import { endsWith, fromString } from '@tinynodes/rxjs-string';

describe('endsWith', () => {
  it('should return true if a string ends with a character', (done) => {
    fromString('test?')
      .pipe(endsWith('?'), take(1))
      .subscribe({
        next: (value) => expect(value).toBeTruthy(),
        complete: () => done(),
      });
  });

  it('should return false if a string does not end with a character', (done) => {
    fromString('test?')
      .pipe(endsWith('!'), take(1))
      .subscribe({
        next: (value) => expect(value).toBeFalsy(),
        complete: () => done(),
      });
  });
});
