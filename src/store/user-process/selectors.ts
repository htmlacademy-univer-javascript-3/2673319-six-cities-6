import {Namespace} from '../../models/namespace.ts';
import {AppState} from '../state.ts';

export const getAuthorizationStatus = (state: Pick<AppState, Namespace.User>) => state[Namespace.User].authorizationStatus;
export const getCurrentUser = (state: Pick<AppState, Namespace.User>) => state[Namespace.User].currentUser;
