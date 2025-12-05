import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, AppState} from './state.ts';
import {setLoading, updateOffers} from './action.ts';
import {OfferPreview} from '../models/offer.ts';
import {ApiPaths} from '../services/api-paths.ts';

export const fetchOfferPreviewsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'fetchOfferPreviews',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoading(true));
    const {data} = await api.get<OfferPreview[]>(ApiPaths.Offers);
    dispatch(setLoading(false));
    dispatch(updateOffers({offers: data}));
  }
);
