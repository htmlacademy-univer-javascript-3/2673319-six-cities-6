import {createSlice} from '@reduxjs/toolkit';
import {
  editFavoriteStatusAction,
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
  isReviewSending: false,
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
      .addCase(sendReviewAction.pending, (state) => {
        state.isReviewSending = true;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.isReviewSending = false;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.isReviewSending = false;
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
      }).
      addCase(editFavoriteStatusAction.fulfilled, (state, action) => {
        const offer = action.payload;
        const actualOffer = state.offerPreviews.find((o) => o.id === offer.id);
        if (actualOffer) {
          actualOffer.isFavorite = offer.isFavorite;
        }
        const actualNearby = state.nearbyOffers.find((o) => o.id === offer.id);
        if (actualNearby) {
          actualNearby.isFavorite = offer.isFavorite;
        }
        const actualFavorite = state.favorites.find((f) => f.id === offer.id);
        if (offer.isFavorite && !actualFavorite) {
          state.favorites.push(offer);
        }
        if (!offer.isFavorite && actualFavorite) {
          state.favorites = state.favorites.filter((f) => f.id !== offer.id);
        }
        if (state.offerDescription && state.offerDescription.id === offer.id) {
          state.offerDescription.isFavorite = offer.isFavorite;
        }
      });
  }
});
