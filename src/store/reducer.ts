import {combineReducers} from '@reduxjs/toolkit';
import {offersData} from './offers-data/offers-data.ts';
import {userProcess} from './user-process/user-process.ts';
import {optionsProcess} from './options-process/options-process.ts';
import {Namespace} from '../models/namespace.ts';

export const reducer = combineReducers({
  [Namespace.Data]: offersData.reducer,
  [Namespace.User]: userProcess.reducer,
  [Namespace.Options]: optionsProcess.reducer,
});
