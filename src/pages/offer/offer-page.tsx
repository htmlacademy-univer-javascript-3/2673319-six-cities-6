import Map from '../../components/map/map.tsx';
import NearOffersList from './components/near-offers-list.tsx';
import Header from '../../components/header/header.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {useEffect} from 'react';
import {fetchOfferDescriptionAction} from '../../store/api-actions.ts';
import Spinner from '../../components/spinner/spinner.tsx';
import {OfferInfo} from './components/offer-info.tsx';
import {
  getNearbyOffers,
  getOfferDescription,
  getOfferDescriptionLoadingStatus
} from '../../store/offers-data/selectors.ts';

export default function OfferPage() {
  const isLoading = useAppSelector(getOfferDescriptionLoadingStatus);
  const {id: offerId} = useParams<string>();
  const dispatch = useAppDispatch();
  const offerDescription = useAppSelector(getOfferDescription);
  const nearbyOfferPreviews = useAppSelector(getNearbyOffers);

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferDescriptionAction(offerId));
    }
  }, [dispatch, offerId]);

  if (isLoading || !offerDescription) {
    return (
      <Spinner/>
    );
  }

  return (
    <div className="page">
      <Header showNavigation/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferInfo offerDescription={offerDescription}/>
          <section className="offer__map map">
            <Map
              city={offerDescription.city}
              offers={[...nearbyOfferPreviews, offerDescription]}
              activeOfferId={offerDescription.id}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <NearOffersList nearOffers={nearbyOfferPreviews}/>
          </section>
        </div>
      </main>
    </div>
  );
}
