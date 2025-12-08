import {store} from '../store';
import {OfferBase, OfferDescription, OfferPreview, OfferReview} from '../models/offer.ts';
import {AuthorizationStatus} from '../models/authorization-status.ts';
import {User} from '../models/user.ts';
import {City} from '../models/city.ts';
import {SortingOption} from '../models/sorting-option.ts';

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type OffersData = {
  isOfferPreviewsLoading: boolean;
  isOfferDescriptionLoading: boolean;
  isFavoritesLoading: boolean;
  offerDescription: OfferDescription | null;
  reviews: OfferReview[];
  nearbyOffers: OfferPreview[];
  offerPreviews: OfferPreview[];
  favorites: OfferPreview[];
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  currentUser: User | null;
}

export type OptionsProcess = {
  city: City;
  sortingOption: SortingOption<OfferBase>;
}
