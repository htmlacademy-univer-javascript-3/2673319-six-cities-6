import React from 'react';
import {MainPage} from './pages/main-page.tsx';
import {Place} from './models/place.ts';

interface AppProps {
  placesCount: number;
}

export const App: React.FC<AppProps> = ({placesCount}) => {
  const places = Array.from({length: placesCount}, (_, i) => new Place(i));
  return (
    <MainPage places={places}/>
  );
};
