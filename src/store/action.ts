import {createAction} from '@reduxjs/toolkit';
import {CityName} from '../models/city.ts';
import {OfferPreview} from '../models/offer.ts';

export const changeCity = createAction<{ city: CityName }>('changeCity');

export const updateOffers = createAction<{ offers: OfferPreview[] }>('updateOffers');
