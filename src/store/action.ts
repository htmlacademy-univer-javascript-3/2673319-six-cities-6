import {createAction} from '@reduxjs/toolkit';
import {City} from '../models/city.ts';
import {OfferBase, OfferPreview} from '../models/offer.ts';
import {SortingOption} from '../models/sorting-option.ts';
import {User} from '../models/user.ts';
import {AuthorizationStatus} from '../models/authorization-status.ts';
import {AppRoutes} from '../router/app-routes.ts';

export const changeCity = createAction<{ city: City }>('changeCity');

export const updateOffers = createAction<{ offers: OfferPreview[] }>('updateOffers');

export const changeSortingOption = createAction<{ sortingOption: SortingOption<OfferBase> }>('changeSortingOption');

export const setLoading = createAction<boolean>('setLoading');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('setAuthorizationStatus');

export const setCurrentUser = createAction<User | null>('setCurrentUser');

export const redirectToRouteActionName = 'redirectToRoute';
export const redirectToRouteAction = createAction<AppRoutes>(redirectToRouteActionName);

