import {createReducer} from '@reduxjs/toolkit';
import {OFFERS_SORTING_OPTIONS} from '../mocks/mocks.ts';
import {OfferBase, OfferDescription, OfferPreview, OfferReview} from '../models/offer.ts';
import {CITIES, City} from '../models/city.ts';
import {SortingOption} from '../models/sorting-option.ts';
import {AuthorizationStatus} from '../models/authorization-status.ts';
import {User} from '../models/user.ts';
import {
  addOfferReviewAction,
  changeCityAction, changeSortingOptionAction, setAuthorizationStatusAction, setCurrentUserAction,
  setNearbyOffersAction, setOfferDescriptionAction,
  setOfferDescriptionLoadingAction, setOfferPreviewsLoadingAction, setOfferReviewsAction, updateOffersPreviewAction
} from './action.ts';

type InitialState = {
  city: City;
  offers: OfferPreview[];
  sortingOption: SortingOption<OfferBase>;
  isOfferPreviewsLoading: boolean;
  isOfferDescriptionLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  offerDescription: OfferDescription | null;
  reviews: OfferReview[];
  nearbyOffers: OfferPreview[];
  currentUser: User | null;
}

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
  sortingOption: OFFERS_SORTING_OPTIONS[0],
  isOfferPreviewsLoading: false,
  isOfferDescriptionLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  offerDescription: null,
  reviews: [],
  nearbyOffers: [],
  currentUser: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(updateOffersPreviewAction, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(changeSortingOptionAction, (state, action) => {
      state.sortingOption = action.payload.sortingOption;
    })
    .addCase(setOfferPreviewsLoadingAction, (state, action) => {
      state.isOfferPreviewsLoading = action.payload;
    })
    .addCase(setOfferDescriptionLoadingAction, (state, action) => {
      state.isOfferDescriptionLoading = action.payload;
    })
    .addCase(setAuthorizationStatusAction, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setCurrentUserAction, (state, action) => {
      state.currentUser = action.payload;
    })
    .addCase(setOfferDescriptionAction, (state, action) => {
      state.offerDescription = action.payload;
    })
    .addCase(setNearbyOffersAction, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setOfferReviewsAction, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(addOfferReviewAction, (state, action) => {
      state.reviews.push(action.payload);
    });
});
