import {Location} from './location.ts';
import {CITIES} from '../mocks/mocks.ts';

export type CityName = typeof CITIES[number];

export type City = {
  name: CityName;
  location: Location;
}
