export type SortingOption<T> = {
  name: string;
  compareFn: (a: T, b: T) => number;
}
