import {Link} from 'react-router-dom';
import {OfferPreview} from '../../../models/offer.ts';
import OfferPreviewInfo from '../../../components/offer-preview-info.tsx';
import {AppRoutes} from '../../../router/app-routes.ts';

interface NearOfferItemProps {
  nearOffer: OfferPreview;
}

export default function NearOfferItem({
  nearOffer
}: NearOfferItemProps) {
  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoutes.OfferBase}/${nearOffer.id}`}>
          <img
            className="place-card__image"
            src={nearOffer.previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <OfferPreviewInfo offerPreview={nearOffer}/>
      </div>
    </article>
  );
}
