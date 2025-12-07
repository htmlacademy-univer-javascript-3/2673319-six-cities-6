import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from './pages/main-page/main-page.tsx';
import LoginPage from './pages/login-page.tsx';
import FavoritesPage from './pages/favorites/favorites-page.tsx';
import OfferPage from './pages/offer/offer-page.tsx';
import NotFoundPage from './pages/not-found-page.tsx';
import PrivateRoute from './router/private-route.tsx';
import {AppRoutes} from './router/app-routes.ts';
import {OfferPreview, OfferReview} from './models/offer.ts';
import {useAppSelector} from './hooks/use-app-selector.ts';
import Spinner from './components/spinner/spinner.tsx';

interface AppProps {
  favorites: OfferPreview[];
  reviews: OfferReview[];
}

export default function App({
  favorites,
  reviews
}: AppProps) {
  const isLoading = useAppSelector((state) => state.isLoading);
  const offerPreviews = useAppSelector((state) => state.offers);

  if (isLoading) {
    return (
      <Spinner/>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Root} element={<MainPage/>}/>
        <Route path={AppRoutes.Login} element={<LoginPage/>}/>
        <Route path={AppRoutes.Favorites}
          element={
            <PrivateRoute>
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
