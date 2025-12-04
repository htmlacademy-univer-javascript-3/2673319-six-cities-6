import {Link} from 'react-router-dom';
import {OfferPreview} from '../models/offer.ts';
import {AppRoutes} from '../router/app-routes.ts';
import PremiumLabel from './premium-label.tsx';
import OfferPreviewInfo from './offer-preview-info.tsx';

interface OfferCardProps {
  offerPreview: OfferPreview;
  setActiveOffer: (id: string | null) => void;
}

export default function OfferCard({
  offerPreview,
  setActiveOffer,
}: OfferCardProps) {
  function onMouseOver() {
    setActiveOffer(offerPreview.id);
  }

  function onMouseLeave() {
    setActiveOffer(null);
  }

  return (
    <article className="cities__card place-card" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <PremiumLabel isPremium={offerPreview.isPremium}/>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoutes.OfferBase}/${offerPreview.id}`}>
          <img
            className="place-card__image"
            src={offerPreview.previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <OfferPreviewInfo offerPreview={offerPreview}/>
      </div>
    </article>
  );
}
