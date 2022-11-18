# RxJS Ninja - Arrays

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png)

[![rxjs-array](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-array?label=@rxjs-ninja/rxjs-array)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-array)

[Website](https://rxjs-ninja.tane.dev)
|
[API Documentation](https://rxjs-ninja.tane.dev/modules/array.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/array/CHANGELOG.md)

`@rxjs-ninja/rxjs-array` provides operators for RxJS for working with
of [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) types in RxJS.

A full list is available on the [API Page](https://rxjs-ninja.tane.dev/modules/array.html).

## Function and Operator categories

### Filter

Operators that return source Arrays, or items from arrays using filtering functions or properties.

```ts
const technology$ = of(['RxJS', 'TypeScript', 'Angular', 'Node', 'NativeScript', 'RxJS Ninja']);
const frontEnd$ = of(['RxJS', 'TypeScript', 'Angular', 'RxJS Ninja', 'React']);

// Get the intersection between two Array values
technology$.pipe(intersection(frontEnd$)).subscribe();
// Output: ['RxJS', 'TypeScript', 'Angular', 'RxJS Ninja']

// Get the difference in the source array
technology$.pipe(difference(frontEnd$)).subscribe();
// Output: ['Node', 'NativeScript']

// Get the difference from both source and input
technology$.pipe(differenceAll(frontEnd$)).subscribe();
// Output: [ ['Node', 'NativeScript'], ['React'] ]
```

### Map Objects

Operators for working with [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
objects and converting to and from Array

```ts
const technology$ = of(['RxJS', 'TypeScript', 'Angular', 'Node', 'NativeScript', 'RxJS Ninja']);
const categories$ = of(['Library', 'Language', 'Framework', 'Runtime', 'Framework', 'Library']);

// Merge two arrays into a tuple and convert it to a map
combineLatest([technology$, categories$])
  .pipe(
    map(([technology, categories]) => technology.map((tech, index) => [tech, categories[index]])),
    toMap(),
    tap((techStack) => {
      console.log(techStack.has('TypeScript')); // true
      console.log(techStack.get('RxJS Ninja')); // 'Library'
    }),
  )
  .subscribe();
```

### Modify

Operators for modifying the source Array such as sorting, reversing, changing the data or to a string

```ts
const technology$ = of(['RxJS', 'TypeScript', 'Angular', 'Node', 'NativeScript', 'RxJS Ninja']);

// Sort the array
technology$.pipe(sort()).subscribe();
// Output: `['Angular', 'NativeScript', 'Node', 'RxJS', 'RxJS Ninja', 'TypeScript']`

// Reverse the array
technology$.pipe(reverse()).subscribe();
// Output: `['RxJS Ninja', 'NativeScript', 'Node', 'Angular', 'TypeScript', 'RxJS']`

// Fill the array
technology$.pipe(fill('jQuery')).subscribe();
// Output: `['jQuery', 'jQuery', 'jQuery', 'jQuery', 'jQuery', 'jQuery']`
```

### Object

Operators for working
with [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
objects and converting to and from Array

```ts
const technology$ = of(['RxJS', 'TypeScript', 'Angular', 'Node', 'NativeScript', 'RxJS Ninja']);
const categories$ = of(['Library', 'Language', 'Framework', 'Runtime', 'Framework', 'Library']);

// Merge two arrays into a tuple and convert it to a map
combineLatest([technology$, categories$])
  .pipe(
    map(([technology, categories]) => technology.map((tech, index) => [index, { tech, category: categories[index] }])),
    toObject(),
  )
  .subscribe();

// {
//  1: { name: 'RxJS', category: 'Library' }, 2: { name: 'Typescript', category: 'Languge' },
//  3: { name: 'Angular', category: 'Framework' }, 4: { name: 'Node', category: 'Runtime' }, ,
//  5: { name: 'NativeScript', category: 'Framework' }, 6: { name: 'RxJS Ninja', category: 'Library' },
// }
```

### Query

Operators for querying for indexes or truthy values related to Array contents

```ts
const technology$ = of(['RxJS', 'TypeScript', 'Angular', 'Node', 'NativeScript', 'RxJS Ninja']);
const frontEnd$ = of(['RxJS', 'TypeScript', 'Angular', 'RxJS Ninja', 'React']);

// Check is source is subset of input
technology$.pipe(isSubsetOf(frontEnd$)).subscribe();
// Output: `false`

// Check if source is a superset of input
technology$.pipe(isSupersetOf(frontEnd$)).subscribe();
// Output: `true`

// Check if the source array contains some strings with `length < 5`
technology$.pipe(some((value) => value.length < 5)).subscribe();
// Output : `true`

// Check if the source array strings are all `length < 5`
technology$.pipe(every((value) => value.length < 5)).subscribe();
// Output : `false`
```

### Set

Operators for working with [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
objects and converting to and from Array

```ts
const technologyStream$ = of(['RxJS', 'TypeScript', 'Angular', 'RxJS', 'TypeScript', 'RxJS Ninja']);

// Covert array to set
technology$.pipe(toSet()).subscribe();
// Output: `Set(4) { 'RxJS', 'TypeScript', 'Angular', 'RxJS Ninja' }`
```
