import {FavoritesList} from './components/favorites-list.tsx';
import Header from '../../components/header/header.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {getFavorites} from '../../store/offers-data/selectors.ts';

export default function FavoritesPage() {
  const favorites = useAppSelector(getFavorites);

  return (
    <div className="page">
      <Header showNavigation/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList favorites={favorites}/>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}
