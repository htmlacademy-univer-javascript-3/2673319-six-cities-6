import {CITIES, City} from '../../models/city.ts';
import {OptionsProcess} from '../state.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OFFERS_SORTING_OPTIONS, SortingOption} from '../../models/sorting-option.ts';
import {OfferBase} from '../../models/offer.ts';
import {Namespace} from '../../models/namespace.ts';

const initialState: OptionsProcess = {
  city: CITIES[0],
  sortingOption: OFFERS_SORTING_OPTIONS[0],
};

export const optionsProcess = createSlice({
  name: Namespace.Options,
  initialState,
  reducers: {
    changeCityAction: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    changeSortingOptionAction: (state, action: PayloadAction<SortingOption<OfferBase>>) => {
      state.sortingOption = action.payload;
    },
  },
});

export const {changeCityAction, changeSortingOptionAction} = optionsProcess.actions;
