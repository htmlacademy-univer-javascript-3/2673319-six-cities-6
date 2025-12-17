import { Route, Routes} from 'react-router-dom';
import MainPage from './pages/main-page/main-page.tsx';
import LoginPage from './pages/login-page.tsx';
import FavoritesPage from './pages/favorites/favorites-page.tsx';
import OfferPage from './pages/offer/offer-page.tsx';
import NotFoundPage from './pages/not-found-page.tsx';
import PrivateRoute from './router/private-route.tsx';
import {AppRoutes} from './router/app-routes.ts';
import {useAppSelector} from './hooks/use-app-selector.ts';
import Spinner from './components/spinner/spinner.tsx';
import {AuthorizationStatus} from './models/authorization-status.ts';
import {HistoryRouter} from './components/history-route.tsx';
import {browserHistory} from './browser-history.ts';
import {getAuthorizationStatus} from './store/user-process/selectors.ts';
import {getFavoritesLoadingStatus, getOfferPreviewsLoadingStatus} from './store/offers-data/selectors.ts';

export default function App() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isFavoritesLoading = useAppSelector(getFavoritesLoadingStatus);
  const isOfferPreviewsLoading = useAppSelector(getOfferPreviewsLoadingStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown || isFavoritesLoading || isOfferPreviewsLoading) {
    return (
      <Spinner/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoutes.Root} element={<MainPage/>}/>
        <Route path={AppRoutes.Login} element={<LoginPage/>}/>
        <Route path={AppRoutes.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.Offer} element={<OfferPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </HistoryRouter>
  );
}
