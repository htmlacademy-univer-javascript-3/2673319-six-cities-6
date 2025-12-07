import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, AppState} from './state.ts';
import {AxiosInstance} from 'axios';
import {redirectToRouteAction} from './action.ts';
import {OfferDescription, OfferPreview, OfferReview} from '../models/offer.ts';
import {ApiPaths} from '../services/api-paths.ts';
import {AppRoutes} from '../router/app-routes.ts';
import {User, UserData} from '../models/user.ts';
import {deleteToken, setToken} from '../services/token-storage.ts';
import {AuthData} from '../models/auth-data.ts';
import {ReviewRequest} from '../models/review-request.ts';

export const fetchOfferPreviewsAction = createAsyncThunk<OfferPreview[], undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOfferPreviews',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(ApiPaths.Offers);
    return data;
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<OfferPreview[], string, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(ApiPaths.NearbyOffers.replace('{offerId}', offerId));
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<OfferReview[], string, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferReview[]>(ApiPaths.Reviews.replace('{offerId}', offerId));
    return data;
  }
);

export const sendReviewAction = createAsyncThunk<OfferReview, ReviewRequest, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/sendReview',
  async ({offerId, comment, rating}, {extra: api}) => {
    const {data} = await api.post<OfferReview>(ApiPaths.Reviews.replace('{offerId}', offerId), {
      comment: comment,
      rating: rating
    });
    return data;
  }
);

export const fetchOfferDescriptionAction = createAsyncThunk<OfferDescription | null, string, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOfferDescription',
  async (offerId, {dispatch, extra: api}) => {
    try {
      dispatch(fetchNearbyOffersAction(offerId));
      dispatch(fetchReviewsAction(offerId));
      const {data} = await api.get<OfferDescription>(ApiPaths.OfferById.replace('{offerId}', offerId));
      return data;
    } catch (error) {
      dispatch(redirectToRouteAction(AppRoutes.NotFound));
    }
    return null;
  }
);

export const fetchFavoritesAction = createAsyncThunk<OfferPreview[], undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(ApiPaths.Favorite);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data: {token: token, ...user}} = await api.get<UserData>(ApiPaths.Login);
    setToken(token);
    return user;
  }
);

export const loginAction = createAsyncThunk<User, AuthData, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token, ...user}} = await api.post<UserData>(ApiPaths.Login, {email, password});
    setToken(token);
    dispatch(redirectToRouteAction(AppRoutes.Root));
    return user;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(ApiPaths.Logout);
    deleteToken();
  },
);
