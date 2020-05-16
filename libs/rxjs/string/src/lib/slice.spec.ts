import { take } from 'rxjs/operators';
import { fromString, slice } from '@tinynodes/rxjs-string';

describe('slice', () => {
  it('should return an sliced string of the original string', (done) => {
    fromString('Mary had a little lamb')
      .pipe(slice(5), take(1))
      .subscribe({
        next: (value) => expect(value).toStrictEqual('had a little lamb'),
        complete: () => done(),
      });
  });

  it('should return an sliced string of the original string with end range', (done) => {
    fromString('Mary had a little lamb')
      .pipe(slice(11, 17), take(1))
      .subscribe({
        next: (value) => expect(value).toStrictEqual('little'),
        complete: () => done(),
      });
  });
});
