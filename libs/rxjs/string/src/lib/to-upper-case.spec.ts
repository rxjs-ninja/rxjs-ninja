import { take } from 'rxjs/operators';
import { fromString, toUpperCase } from '@tinynodes/rxjs-string';

describe('toUpperCase', () => {
  it('should take a string and convert it to uppercase', (done) => {
    fromString('this is a test')
      .pipe(toUpperCase(), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('THIS IS A TEST'),
        complete: () => done(),
      });
  });

  it('should take a string and convert it to uppercase with locale', (done) => {
    fromString('this is ä test')
      .pipe(toUpperCase('de-DE'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('THIS IS Ä TEST'),
        complete: () => done(),
      });
  });
});
