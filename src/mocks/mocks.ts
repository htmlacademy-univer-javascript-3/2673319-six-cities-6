import offersJson from './offers.json';
import favoritesJson from './favorites.json';
import {OfferPreview} from '../models/offer.ts';

export const OFFER_PREVIEWS_MOCK: OfferPreview[] = offersJson as OfferPreview[];
export const FAVORITES_MOCK: OfferPreview[] = favoritesJson as OfferPreview[];
