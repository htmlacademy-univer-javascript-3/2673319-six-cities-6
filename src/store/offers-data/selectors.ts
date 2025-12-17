import {createSelector} from '@reduxjs/toolkit';
import {AppState} from '../state.ts';
import {Namespace} from '../../models/namespace.ts';
import {getCity, getSortingOption} from '../options-process/selectors.ts';

export const getOfferPreviews = createSelector([
  getSortingOption,
  getCity,
  (state: Pick<AppState, Namespace.Data>) => state[Namespace.Data].offerPreviews
],
(sortingOption, city, offerPreviews) =>
  offerPreviews
    .filter((o) => o.city.name === city.name)
    .sort(sortingOption.compareFn)
);

export const getOfferPreviewsLoadingStatus = (state: Pick<AppState, Namespace.Data>) => state[Namespace.Data].isOfferPreviewsLoading;
export const getOfferDescription = (state: Pick<AppState, Namespace.Data>) => state[Namespace.Data].offerDescription;
export const getOfferDescriptionLoadingStatus = (state: Pick<AppState, Namespace.Data>) => state[Namespace.Data].isOfferDescriptionLoading;
export const getNearbyOffers = createSelector(
  [(state: Pick<AppState, Namespace.Data>) => state[Namespace.Data].nearbyOffers],
  (offers) => offers.slice(0, 10)
);
export const getReviews = createSelector(
  [(state: Pick<AppState, Namespace.Data>) => state[Namespace.Data].reviews],
  (reviews) => reviews
    .toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
);
export const getReviewSendingStatus = (state: Pick<AppState, Namespace.Data>) => state[Namespace.Data].isReviewSending;
export const getFavorites = (state: Pick<AppState, Namespace.Data>) => state[Namespace.Data].favorites;
export const getFavoritesLoadingStatus = (state: Pick<AppState, Namespace.Data>) => state[Namespace.Data].isFavoritesLoading;
