import {createReducer} from '@reduxjs/toolkit';
import {OFFERS_SORTING_OPTIONS} from '../mocks/mocks.ts';
import {OfferBase, OfferPreview} from '../models/offer.ts';
import {CITIES, City} from '../models/city.ts';
import {
  changeCity,
  changeSortingOption,
  setAuthorizationStatus,
  setCurrentUser,
  setLoading,
  updateOffers
} from './action.ts';
import {SortingOption} from '../models/sorting-option.ts';
import {AuthorizationStatus} from '../models/authorization-status.ts';
import {User} from '../models/user.ts';

type InitialState = {
  city: City;
  offers: OfferPreview[];
  sortingOption: SortingOption<OfferBase>;
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  currentUser: User | null;
}

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
  sortingOption: OFFERS_SORTING_OPTIONS[0],
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  currentUser: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(updateOffers, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(changeSortingOption, (state, action) => {
      state.sortingOption = action.payload.sortingOption;
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setCurrentUser, (state, action) => {
      state.currentUser = action.payload;
    });
});
