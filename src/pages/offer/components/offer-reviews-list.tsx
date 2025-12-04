import {OfferReview} from '../../../models/offer.ts';
import OfferReviewItem from './offer-review-item.tsx';

interface OfferReviewsListProps {
  offerReviews: OfferReview[];
}

export default function OfferReviewsList({
  offerReviews
}: OfferReviewsListProps) {
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{offerReviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {offerReviews.map((review) => (
          <li key={review.id} className="reviews__item">
            <OfferReviewItem offerReview={review}/>
          </li>
        ))}
      </ul>
    </>
  );
}
