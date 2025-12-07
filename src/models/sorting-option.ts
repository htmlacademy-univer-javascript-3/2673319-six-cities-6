import {OfferBase} from './offer.ts';

export type SortingOption<T> = {
  name: string;
  compareFn: (a: T, b: T) => number;
}

export const OFFERS_SORTING_OPTIONS: SortingOption<OfferBase>[] = [
  {
    name: 'Popular',
    compareFn: () => 0
  },
  {
    name: 'Price: low to high',
    compareFn: (a, b) => a.price - b.price
  },
  {
    name: 'Price: high to low',
    compareFn: (a, b) => b.price - a.price
  },
  {
    name: 'Top rated first',
    compareFn: (a, b) => b.rating - a.rating
  },
];
