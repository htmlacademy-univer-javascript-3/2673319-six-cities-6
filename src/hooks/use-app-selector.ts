import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {AppState} from '../store/state.ts';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
