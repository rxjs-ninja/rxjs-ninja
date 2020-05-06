import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { endsWith } from './ends-with';
import { startsWith } from './starts-with';

describe('endsWith', () => {
  it('should return true if a string starts with a character', (done) => {
    of('test?')
      .pipe(startsWith('t'), take(1))
      .subscribe({
        next: (value) => expect(value).toBeTruthy(),
        complete: () => done(),
      });
  });

  it('should return false if a string does not start with a character', (done) => {
    of('test?')
      .pipe(startsWith('?'), take(1))
      .subscribe({
        next: (value) => expect(value).toBeFalsy(),
        complete: () => done(),
      });
  });
});
