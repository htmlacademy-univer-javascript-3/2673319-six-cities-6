import {Namespace} from '../../models/namespace.ts';
import {AppState} from '../state.ts';

export const getCity = (state: Pick<AppState, Namespace.Options>) => state[Namespace.Options].city;
export const getSortingOption = (state: Pick<AppState, Namespace.Options>) => state[Namespace.Options].sortingOption;
