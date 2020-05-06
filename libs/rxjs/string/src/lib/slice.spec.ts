import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { slice } from './slice';

describe('slice', () => {
  it('should return an sliced string of the original string', (done) => {
    of('Mary had a little lamb')
      .pipe(slice(5), take(1))
      .subscribe({
        next: (value) => expect(value).toStrictEqual('had a little lamb'),
        complete: () => done(),
      });
  });

  it('should return an sliced string of the original string with end range', (done) => {
    of('Mary had a little lamb')
      .pipe(slice(0, 4), take(1))
      .subscribe({
        next: (value) => expect(value).toStrictEqual('Mary'),
        complete: () => done(),
      });
  });
});
