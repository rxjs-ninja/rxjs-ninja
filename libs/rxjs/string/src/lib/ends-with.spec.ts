import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { endsWith } from './ends-with';

describe('endsWith', () => {
  it('should return true if a string ends with a character', done => {
    of('test?')
      .pipe(endsWith('?'), take(1))
      .subscribe({
        next: value => expect(value).toBeTruthy(),
        complete: () => done(),
      });
  });

  it('should return false if a string does not end with a character', done => {
    of('test?')
      .pipe(endsWith('!'), take(1))
      .subscribe({
        next: value => expect(value).toBeFalsy(),
        complete: () => done(),
      });
  });
});
