import { of } from 'rxjs';
import { toUpperCase } from './to-upper-case';
import { take } from 'rxjs/operators';

describe('toUpperCase', () => {
  it('should take a string and convert it to uppercase', done => {
    of('this is a test')
      .pipe(toUpperCase(), take(1))
      .subscribe({
        next: value => expect(value).toBe('THIS IS A TEST'),
        complete: () => done(),
      });
  });

  it('should take a string and convert it to uppercase with locale', done => {
    of('this is ä test')
      .pipe(toUpperCase('de-DE'), take(1))
      .subscribe({
        next: value => expect(value).toBe('THIS IS Ä TEST'),
        complete: () => done(),
      });
  });
});
