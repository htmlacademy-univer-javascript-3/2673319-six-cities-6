import {Location} from './location.ts';
import {City} from './city.ts';

export type OfferType = 'apartment' | 'room' | 'hotel';

export type OfferBase = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type OfferPreview = OfferBase & {
  previewImage: string;
}
