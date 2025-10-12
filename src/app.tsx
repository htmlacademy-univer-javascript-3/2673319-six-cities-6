import MainPage from './pages/main-page.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/login-page.tsx';
import FavoritesPage from './pages/favorites-page.tsx';
import OfferPage from './pages/offer-page.tsx';
import NotFoundPage from './pages/not-found-page.tsx';
import PrivateRoute from './router/private-route.tsx';
import {AppRoutes} from './router/app-routes.ts';
import {Place} from './models/place.ts';

interface AppProps {
  placesCount: number;
}

export default function App({
  placesCount,
}: AppProps) {
  const places: Place[] = Array.from({length: placesCount}, (_, i) => ({id: i}));
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Root} element={<MainPage places={places}/>}/>
        <Route path={AppRoutes.Login} element={<LoginPage/>}/>
        <Route path={AppRoutes.Favorites}
          element={
            <PrivateRoute isAuthenticated={false}>
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.Offer} element={<OfferPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
