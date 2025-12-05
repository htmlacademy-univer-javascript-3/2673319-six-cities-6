import {Location} from './location.ts';

export type City = {
  name: CityName;
  location: Location;
}

export type CityName = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export const CITIES: readonly City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.856613,
      longitude: 2.352222,
      zoom: 13
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.935173,
      longitude: 6.953101,
      zoom: 13
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.850346,
      longitude: 4.351721,
      zoom: 13
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 13
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.551086,
      longitude: 9.993682,
      zoom: 13
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.227741,
      longitude: 6.773456,
      zoom: 13
    },
  }
] as const;
