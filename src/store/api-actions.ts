import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, AppState} from './state.ts';
import {AxiosInstance} from 'axios';
import {
  addOfferReviewAction,
  redirectToRouteAction, setAuthorizationStatusAction, setCurrentUserAction,
  setNearbyOffersAction, setOfferDescriptionAction, setOfferDescriptionLoadingAction,
  setOfferPreviewsLoadingAction,
  setOfferReviewsAction,
  updateOffersPreviewAction
} from './action.ts';
import {OfferDescription, OfferPreview, OfferReview} from '../models/offer.ts';
import {ApiPaths} from '../services/api-paths.ts';
import {AppRoutes} from '../router/app-routes.ts';
import {UserData} from '../models/user.ts';
import {deleteToken, setToken} from '../services/token-storage.ts';
import {AuthorizationStatus} from '../models/authorization-status.ts';
import {AuthData} from '../models/auth-data.ts';
import {ReviewRequest} from '../models/review-request.ts';

export const fetchOfferPreviewsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'fetchOfferPreviews',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOfferPreviewsLoadingAction(true));
    const {data} = await api.get<OfferPreview[]>(ApiPaths.Offers);
    dispatch(setOfferPreviewsLoadingAction(false));
    dispatch(updateOffersPreviewAction({offers: data}));
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'fetchNearbyOffers',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(ApiPaths.NearbyOffers.replace('{offerId}', offerId));
    dispatch(setNearbyOffersAction(data));
  }
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'fetchReviews',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferReview[]>(ApiPaths.Reviews.replace('{offerId}', offerId));
    dispatch(setOfferReviewsAction(data));
  }
);

export const sendReviewAction = createAsyncThunk<void, ReviewRequest, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'sendReview',
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<OfferReview>(ApiPaths.Reviews.replace('{offerId}', offerId), {comment: comment, rating: rating});
    dispatch(addOfferReviewAction(data));
  }
);

export const fetchOfferDescriptionAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'fetchOfferDescription',
  async (offerId, {dispatch, extra: api}) => {
    try {
      dispatch(setOfferDescriptionLoadingAction(true));
      dispatch(fetchNearbyOffersAction(offerId));
      dispatch(fetchReviewsAction(offerId));
      const {data} = await api.get<OfferDescription>(ApiPaths.OfferById.replace('{offerId}', offerId));
      dispatch(setOfferDescriptionAction(data));
    } catch (error) {
      dispatch(redirectToRouteAction(AppRoutes.NotFound));
    } finally {
      dispatch(setOfferDescriptionLoadingAction(false));
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOfferPreviewsLoadingAction(true));
    try {
      const {data: {token: token, ...user}} = await api.get<UserData>(ApiPaths.Login);
      setToken(token);
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Auth));
      dispatch(setCurrentUserAction(user));
    } catch {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token, ...user}} = await api.post<UserData>(ApiPaths.Login, {email, password});
    setToken(token);
    dispatch(setAuthorizationStatusAction(AuthorizationStatus.Auth));
    dispatch(setCurrentUserAction(user));
    dispatch(redirectToRouteAction(AppRoutes.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiPaths.Logout);
    deleteToken();
    dispatch(setAuthorizationStatusAction(AuthorizationStatus.NoAuth));
    dispatch(setCurrentUserAction(null));
  },
);

