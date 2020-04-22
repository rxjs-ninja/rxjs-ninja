import { of } from 'rxjs';
import { toLowerCase } from './to-lower-case';
import { take } from 'rxjs/operators';

describe('toLowerCase', () => {
  it('should take a string and convert it to lowercase', done => {
    of('THIS IS A TEST')
      .pipe(toLowerCase(), take(1))
      .subscribe({
        next: value => expect(value).toBe('this is a test'),
        complete: () => done(),
      });
  });

  it('should take a string and convert it to lowercase with locale', done => {
    of('THIS IS Ä TEST')
      .pipe(toLowerCase('de-DE'), take(1))
      .subscribe({
        next: value => expect(value).toBe('this is ä test'),
        complete: () => done(),
      });
  });
});
