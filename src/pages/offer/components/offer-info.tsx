import {memo} from 'react';
import {OfferDescription} from '../../../models/offer.ts';
import {useAppSelector} from '../../../hooks/use-app-selector.ts';
import PremiumLabel from '../../../components/premium-label.tsx';
import RatingStars from '../../../components/rating-stars.tsx';
import OfferReviewsList from './offer-reviews-list.tsx';
import {AuthorizationStatus} from '../../../models/authorization-status.ts';
import OfferReviewForm from './offer-review-form.tsx';
import {getAuthorizationStatus} from '../../../store/user-process/selectors.ts';
import {getReviews} from '../../../store/offers-data/selectors.ts';
import BookmarkButton from '../../../components/bookmark-button.tsx';

const MAX_IMAGES_COUNT = 6;

interface OfferInfoProps {
  offerDescription: OfferDescription;
}

export const OfferInfo = memo((
  {offerDescription}: OfferInfoProps
) => {
  const offerReviews = useAppSelector(getReviews);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <>
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {
            offerDescription.images.slice(0, MAX_IMAGES_COUNT).map((image) => (
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
            <BookmarkButton
              id={offerDescription.id}
              isFavorite={offerDescription.isFavorite}
              className={'offer'}
              width={31}
              height={33}
            />
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
    </>
  );
});

OfferInfo.displayName = 'OfferInfo';
