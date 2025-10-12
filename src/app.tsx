import MainPage from './pages/main-page.tsx';

interface AppProps {
  placesCount: number;
}

export default function App({
  placesCount,
}: AppProps) {
  const places = Array.from({length: placesCount}, (_, i) => ({id: i}));
  return (
    <MainPage places={places}/>
  );
}
