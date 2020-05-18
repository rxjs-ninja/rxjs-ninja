import { take } from 'rxjs/operators';
import { fromString } from '@tinynodes/rxjs-string';
import { repeat } from './repeat';

describe('repeat', () => {
  it('should take a string and replace a string pattern', (done) => {
    fromString('foobar')
      .pipe(repeat(5), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('foobarfoobarfoobarfoobarfoobar'),
        complete: () => done(),
      });
  });

  it('should take a string and replace a regex pattern', (done) => {
    fromString('foobar')
      .pipe(repeat(5, ','), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('foobar,foobar,foobar,foobar,foobar'),
        complete: () => done(),
      });
  });
});
