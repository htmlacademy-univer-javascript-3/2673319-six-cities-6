import offersJson from './offers.json';
import favoritesJson from './favorites.json';
import reviewsJson from './reviews.json';
import {OfferPreview, OfferReview} from '../models/offer.ts';

export const OFFER_PREVIEWS_MOCK: OfferPreview[] = offersJson as OfferPreview[];
export const FAVORITES_MOCK: OfferPreview[] = favoritesJson as OfferPreview[];
export const REVIEWS_MOCK: OfferReview[] = reviewsJson as OfferReview[];

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
