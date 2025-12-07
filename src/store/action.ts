import {createAction} from '@reduxjs/toolkit';
import {City} from '../models/city.ts';
import {OfferBase, OfferDescription, OfferPreview, OfferReview} from '../models/offer.ts';
import {SortingOption} from '../models/sorting-option.ts';
import {User} from '../models/user.ts';
import {AuthorizationStatus} from '../models/authorization-status.ts';
import {AppRoutes} from '../router/app-routes.ts';

export const changeCityAction = createAction<{ city: City }>('changeCity');

export const updateOffersPreviewAction = createAction<{ offers: OfferPreview[] }>('updateOffersPreview');

export const changeSortingOptionAction = createAction<{
  sortingOption: SortingOption<OfferBase>;
}>('changeSortingOption');

export const setOfferPreviewsLoadingAction = createAction<boolean>('setOfferPreviewsLoading');

export const setOfferDescriptionLoadingAction = createAction<boolean>('setOfferDescriptionLoading');

export const setAuthorizationStatusAction = createAction<AuthorizationStatus>('setAuthorizationStatus');

export const setCurrentUserAction = createAction<User | null>('setCurrentUser');

export const setOfferDescriptionAction = createAction<OfferDescription>('setOfferDescription');

export const setNearbyOffersAction = createAction<OfferPreview[]>('setNearbyOffers');

export const setOfferReviewsAction = createAction<OfferReview[]>('setOfferReviews');
export const addOfferReviewAction = createAction<OfferReview>('addOfferReview');

export const redirectToRouteActionName = 'redirectToRoute';
export const redirectToRouteAction = createAction<AppRoutes>(redirectToRouteActionName);
