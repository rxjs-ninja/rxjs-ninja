import { of } from 'rxjs';
import { split } from './split';
import { take } from 'rxjs/operators';

describe('split', () => {
  it('should return an array of strings based on a separator on the original string', (done) => {
    of('Name,Age,Street')
      .pipe(split(','), take(1))
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['Name', 'Age', 'Street']),
        complete: () => done(),
      });
  });
});
