import {createAction} from '@reduxjs/toolkit';
import {AppRoutes} from '../router/app-routes.ts';

export const redirectToRouteAction = createAction<AppRoutes>('route/redirectToRoute');
