import {createReducer} from '@reduxjs/toolkit';
import {CITIES, OFFER_PREVIEWS_MOCK, OFFERS_SORTING_OPTIONS} from '../mocks/mocks.ts';
import {OfferBase, OfferPreview} from '../models/offer.ts';
import {CityName} from '../models/city.ts';
import {changeCity, changeSortingOption, updateOffers} from './action.ts';
import {SortingOption} from '../models/sorting-option.ts';

type InitialState = {
  city: CityName;
  offers: OfferPreview[];
  sortingOption: SortingOption<OfferBase>;
}

const initialState: InitialState = {
  city: CITIES[0],
  offers: OFFER_PREVIEWS_MOCK,
  sortingOption: OFFERS_SORTING_OPTIONS[0],
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
    });
});
