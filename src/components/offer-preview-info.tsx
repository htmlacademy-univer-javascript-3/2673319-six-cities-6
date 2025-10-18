import {OfferPreview} from '../models/offer.ts';
import RatingStars from './rating-stars.tsx';
import {Link} from 'react-router-dom';

interface OfferPreviewInfoProps {
  offerDescriptionUrl: string;
  offerPreview: OfferPreview;
}

export default function OfferPreviewInfo({
  offerDescriptionUrl,
  offerPreview,
}: OfferPreviewInfoProps) {
  return (
    <>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offerPreview.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <RatingStars rating={offerPreview.rating} className={'place-card'}/>
      <h2 className="place-card__name">
        <Link to={offerDescriptionUrl}>{offerPreview.title}</Link>
      </h2>
      <p className="place-card__type">{offerPreview.type}</p>
    </>
  );
}
