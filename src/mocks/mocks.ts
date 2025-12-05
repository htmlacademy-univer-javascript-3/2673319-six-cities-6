import favoritesJson from './favorites.json';
import reviewsJson from './reviews.json';
import {OfferBase, OfferPreview, OfferReview} from '../models/offer.ts';
import {SortingOption} from '../models/sorting-option.ts';

export const FAVORITES_MOCK: OfferPreview[] = favoritesJson as OfferPreview[];
export const REVIEWS_MOCK: OfferReview[] = reviewsJson as OfferReview[];

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
