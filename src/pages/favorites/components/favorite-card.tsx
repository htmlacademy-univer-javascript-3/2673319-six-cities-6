import {OfferPreview} from '../../../models/offer.ts';
import PremiumLabel from '../../../components/premium-label.tsx';
import {AppRoutes} from '../../../router/app-routes.ts';
import {Link} from 'react-router-dom';
import OfferPreviewInfo from '../../../components/offer-preview-info.tsx';

interface FavoriteCardProps {
  favorite: OfferPreview;
}

export default function FavoriteCard({
  favorite,
}: FavoriteCardProps) {
  const offerDescriptionUrl = `${AppRoutes.OfferBase}/${favorite.id}`;
  return (
    <article className="favorites__card place-card">
      <PremiumLabel isPremium={favorite.isPremium}/>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={offerDescriptionUrl}>
          <img
            className="place-card__image"
            src={favorite.previewImage}
            width={150}
            height={110}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <OfferPreviewInfo offerPreview={favorite}/>
      </div>
    </article>
  );
}
