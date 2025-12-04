import {createReducer} from '@reduxjs/toolkit';
import {CITIES, OFFER_PREVIEWS_MOCK} from '../mocks/mocks.ts';
import {OfferPreview} from '../models/offer.ts';
import {CityName} from '../models/city.ts';
import {changeCity, updateOffers} from './action.ts';

type InitialState = {
  city: CityName;
  offers: OfferPreview[];
}

const initialState: InitialState = {
  city: CITIES[0],
  offers: OFFER_PREVIEWS_MOCK,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(updateOffers, (state, action) => {
      state.offers = action.payload.offers;
    });
});
