import {useState} from 'react';
import {Link} from 'react-router-dom';
import {AppRoutes} from '../../router/app-routes.ts';
import OfferCardsList from '../../components/offers-cards-list.tsx';
import Map from '../../components/map/map.tsx';
import CitiesList from './components/cities-list.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import OffersSortingOptions from './components/offers-sorting-options.tsx';
import {CITIES} from '../../models/city.ts';

export default function MainPage() {
  const [activeOfferId, setActiveOffer] = useState<string | null>(null);
  const city = useAppSelector((state) => state.city);
  const offersSortingOption = useAppSelector((state) => state.sortingOption);
  const offerPreviews = useAppSelector((state) => state.offers)
    .filter((o) => o.city.name === city.name)
    .sort(offersSortingOption.compareFn);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoutes.Root}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={CITIES}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offerPreviews.length} places to stay in {city.name}</b>
              <OffersSortingOptions/>
              <div className="cities__places-list places__list tabs__content">
                <OfferCardsList offerPreviews={offerPreviews} setActiveOffer={setActiveOffer}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={city} offers={offerPreviews} activeOfferId={activeOfferId}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
