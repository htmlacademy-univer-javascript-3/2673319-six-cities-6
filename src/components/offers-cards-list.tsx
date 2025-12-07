import {OfferPreview} from '../models/offer.ts';
import {OfferCard} from './offer-card.tsx';

interface OfferCardsListProps {
  offerPreviews: OfferPreview[];
  setActiveOffer: (id: string | null) => void;
}

export default function OfferCardsList({
  offerPreviews,
  setActiveOffer,
}: OfferCardsListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offerPreviews.map((offerPreview) =>
        <OfferCard key={offerPreview.id} offerPreview={offerPreview} setActiveOffer={setActiveOffer}/>
      )}
    </div>
  );
}
