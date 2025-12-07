import OfferReviewForm from './components/offer-review-form.tsx';
import Map from '../../components/map/map.tsx';
import OfferReviewsList from './components/offer-reviews-list.tsx';
import NearOffersList from './components/near-offers-list.tsx';
import Header from '../../components/header/header.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {useEffect} from 'react';
import {fetchOfferDescriptionAction} from '../../store/api-actions.ts';
import Spinner from '../../components/spinner/spinner.tsx';
import PremiumLabel from '../../components/premium-label.tsx';
import RatingStars from '../../components/rating-stars.tsx';
import {AuthorizationStatus} from '../../models/authorization-status.ts';

export default function OfferPage() {
  const isLoading = useAppSelector((state) => state.isOfferDescriptionLoading);
  const {id: offerId} = useParams<string>();
  const dispatch = useAppDispatch();
  const offerDescription = useAppSelector((state) => state.offerDescription);
  const nearbyOfferPreviews = useAppSelector((state) => state.nearbyOffers);
  const offerReviews = useAppSelector((state) => state.reviews);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

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
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                offerDescription.images.map((image) => (
                  <div key={image} className="offer__image-wrapper">
                    <img className="offer__image" src={image} alt="Photo studio"/>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <PremiumLabel isPremium={offerDescription.isPremium}/>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offerDescription.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <RatingStars rating={offerDescription.rating} className="offer"/>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offerDescription.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerDescription.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offerDescription.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offerDescription.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {
                    offerDescription.goods.map((good) => (
                      <li key={good} className="offer__inside-item">
                        {good}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offerDescription.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offerDescription.host.name}
                  </span>
                  {
                    offerDescription.host.isPro &&
                    <span className="offer__user-status">
                      Pro
                    </span>
                  }
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offerDescription.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <OfferReviewsList offerReviews={offerReviews}/>
                {authorizationStatus === AuthorizationStatus.Auth && <OfferReviewForm/>}
              </section>
            </div>
          </div>
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
