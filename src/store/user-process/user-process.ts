import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../models/authorization-status.ts';
import {UserProcess} from '../state.ts';
import {Namespace} from '../../models/namespace.ts';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions.ts';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  currentUser: null,
};

export const userProcess = createSlice({
  name: Namespace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.currentUser = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.currentUser = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.currentUser = null;
      });
  }
});
