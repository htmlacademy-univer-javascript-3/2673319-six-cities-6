import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, AppState} from './state.ts';
import {redirectToRouteAction, setAuthorizationStatus, setCurrentUser, setLoading, updateOffers} from './action.ts';
import {OfferPreview} from '../models/offer.ts';
import {ApiPaths} from '../services/api-paths.ts';
import {AuthorizationStatus} from '../models/authorization-status.ts';
import {UserData} from '../models/user.ts';
import {deleteToken, setToken} from '../services/token-storage.ts';
import {AuthData} from '../models/auth-data.ts';
import {AppRoutes} from '../router/app-routes.ts';

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

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoading(true));
    try {
      const {data: {token: token, ...user}} = await api.get<UserData>(ApiPaths.Login);
      setToken(token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setCurrentUser(user));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
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
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setCurrentUser(user));
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
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setCurrentUser(null));
  },
);
