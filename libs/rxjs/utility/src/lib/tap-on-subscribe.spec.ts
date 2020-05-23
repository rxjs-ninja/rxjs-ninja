import { of } from 'rxjs';
import { tapOnSubscribe } from './tap-on-subscribe';
import { take } from 'rxjs/operators';

describe('tapOnSubscribe', () => {
  it('should be called on each subscription', (done) => {
    let count = 0;
    const obs = of('test');

    obs
      .pipe(
        tapOnSubscribe(() => count++),
        take(1),
      )
      .subscribe();
    obs
      .pipe(
        tapOnSubscribe(() => count++),
        take(1),
      )
      .subscribe();
    obs
      .pipe(
        tapOnSubscribe(() => count++),
        take(1),
      )
      .subscribe({
        next: () => expect(count).toBe(3),
        complete: () => done(),
      });
  });
});
