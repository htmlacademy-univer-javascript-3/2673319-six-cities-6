import {OfferReview} from '../../../models/offer.ts';
import RatingStars from '../../../components/rating-stars.tsx';

interface OfferReviewItemProps {
  offerReview: OfferReview;
}

function formatToDateString(dateISO: string) {
  const date = new Date(dateISO);
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  });
  return formatter.format(date);
}

export default function OfferReviewItem({
  offerReview
}: OfferReviewItemProps) {
  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={offerReview.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{offerReview.user.name}</span>
      </div>
      <div className="reviews__info">
        <RatingStars rating={offerReview.rating} className="reviews"/>
        <p className="reviews__text">
          {offerReview.comment}
        </p>
        <time className="reviews__time" dateTime={offerReview.date}>{formatToDateString(offerReview.date)}</time>
      </div>
    </>
  );
}
