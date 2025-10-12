import React from 'react';
import {MainPage} from './pages/main-page.tsx';

interface AppProps {
  placesCount: number;
}

export const App: React.FC<AppProps> = ({placesCount}) => {
  const places = Array.from({length: placesCount}, (_, i) => ({id: i}));
  return (
    <MainPage places={places}/>
  );
};
