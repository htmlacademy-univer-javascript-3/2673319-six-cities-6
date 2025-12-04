import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store/state.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
