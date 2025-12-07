import {createSlice} from '@reduxjs/toolkit';
import {
  fetchFavoritesAction,
  fetchNearbyOffersAction, fetchOfferDescriptionAction,
  fetchOfferPreviewsAction,
  fetchReviewsAction,
  sendReviewAction
} from '../api-actions.ts';
import {Namespace} from '../../models/namespace.ts';
import {OffersData} from '../state.ts';

const initialState: OffersData = {
  isOfferPreviewsLoading: false,
  isOfferDescriptionLoading: false,
  isFavoritesLoading: false,
  offerDescription: null,
  reviews: [],
  nearbyOffers: [],
  offerPreviews: [],
  favorites: [],
};

export const offersData = createSlice({
  name: Namespace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferPreviewsAction.pending, (state) => {
        state.isOfferPreviewsLoading = true;
      })
      .addCase(fetchOfferPreviewsAction.fulfilled, (state, action) => {
        state.offerPreviews = action.payload;
        state.isOfferPreviewsLoading = false;
      })
      .addCase(fetchOfferPreviewsAction.rejected, (state) => {
        state.isOfferPreviewsLoading = false;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(fetchOfferDescriptionAction.pending, (state) => {
        state.isOfferDescriptionLoading = true;
      })
      .addCase(fetchOfferDescriptionAction.fulfilled, (state, action) => {
        state.offerDescription = action.payload;
        state.isOfferDescriptionLoading = false;
      })
      .addCase(fetchOfferDescriptionAction.rejected, (state) => {
        state.isOfferDescriptionLoading = false;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isFavoritesLoading = false;
      });
  }
});
