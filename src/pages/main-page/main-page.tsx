import {useState} from 'react';
import OfferCardsList from '../../components/offers-cards-list.tsx';
import Map from '../../components/map/map.tsx';
import CitiesList from './components/cities-list.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import OffersSortingOptions from './components/offers-sorting-options.tsx';
import {CITIES} from '../../models/city.ts';
import Header from '../../components/header/header.tsx';

export default function MainPage() {
  const [activeOfferId, setActiveOffer] = useState<string | null>(null);
  const city = useAppSelector((state) => state.city);
  const offersSortingOption = useAppSelector((state) => state.sortingOption);
  const offerPreviews = useAppSelector((state) => state.offers)
    .filter((o) => o.city.name === city.name)
    .sort(offersSortingOption.compareFn);

  return (
    <div className="page page--gray page--main">
      <Header showNavigation/>
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
