import { from } from 'rxjs';
import { startWithTap } from './start-with-tap';

describe('startWithTap', () => {
  it('should tap once when getting multiple values', done => {
    let isTapped = 0;
    from([1, 2, 3])
      .pipe(startWithTap(() => isTapped++))
      .subscribe({
        complete: () => {
          expect(isTapped).toBe(1);
          done();
        },
      });
  });
});
