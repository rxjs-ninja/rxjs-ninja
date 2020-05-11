import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function inRange(min: number, max: number, noBoundsMatch = false) {
  return (source: Observable<number>) =>
    source.pipe(map((value) => (noBoundsMatch ? value > min && value < max : value >= min && value <= max)));
}
