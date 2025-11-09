import {OfferPreview} from '../../../models/offer.ts';
import NearOfferItem from './near-offer-item.tsx';

interface NearOffersListProps {
  nearOffers: OfferPreview[];
}

export default function NearOffersList({
  nearOffers
}: NearOffersListProps) {
  return (
    <div className="near-places__list places__list">
      {
        nearOffers.map((offer) => <NearOfferItem key={offer.id} nearOffer={offer}/>)
      }
    </div>
  );
}
