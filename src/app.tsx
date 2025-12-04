import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from './pages/main-page/main-page.tsx';
import LoginPage from './pages/login-page.tsx';
import FavoritesPage from './pages/favorites/favorites-page.tsx';
import OfferPage from './pages/offer/offer-page.tsx';
import NotFoundPage from './pages/not-found-page.tsx';
import PrivateRoute from './router/private-route.tsx';
import {AppRoutes} from './router/app-routes.ts';
import {OfferPreview, OfferReview} from './models/offer.ts';

interface AppProps {
  offerPreviews: OfferPreview[];
  favorites: OfferPreview[];
  reviews: OfferReview[];
}

export default function App({
  offerPreviews,
  favorites,
  reviews
}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Root} element={<MainPage/>}/>
        <Route path={AppRoutes.Login} element={<LoginPage/>}/>
        <Route path={AppRoutes.Favorites}
          element={
            <PrivateRoute isAuthenticated>
              <FavoritesPage favorites={favorites}/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.Offer}
          element={
            <OfferPage offerReviews={reviews} nearOfferPreviews={offerPreviews.slice(0, 3)}/>
          }
        />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
