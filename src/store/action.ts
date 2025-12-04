import {createAction} from '@reduxjs/toolkit';
import {CityName} from '../models/city.ts';
import {OfferBase, OfferPreview} from '../models/offer.ts';
import {SortingOption} from '../models/sorting-option.ts';

export const changeCity = createAction<{ city: CityName }>('changeCity');

export const updateOffers = createAction<{ offers: OfferPreview[] }>('updateOffers');

export const changeSortingOption = createAction<{ sortingOption: SortingOption<OfferBase> }>('changeSortingOption');
