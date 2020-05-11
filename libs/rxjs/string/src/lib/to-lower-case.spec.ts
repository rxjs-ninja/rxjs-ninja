import { take } from 'rxjs/operators';
import { fromString, toLowerCase } from '@tinynodes/rxjs-string';

describe('toLowerCase', () => {
  it('should take a string and convert it to lowercase', (done) => {
    fromString('THIS IS A TEST')
      .pipe(toLowerCase(), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('this is a test'),
        complete: () => done(),
      });
  });

  it('should take a string and convert it to lowercase with locale', (done) => {
    fromString('THIS IS Ä TEST')
      .pipe(toLowerCase('de-DE'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('this is ä test'),
        complete: () => done(),
      });
  });
});
