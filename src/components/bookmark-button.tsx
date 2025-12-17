import {useNavigate} from 'react-router-dom';
import {editFavoriteStatusAction} from '../store/api-actions.ts';
import {useAppDispatch} from '../hooks/use-app-dispatch.ts';
import {useAppSelector} from '../hooks/use-app-selector.ts';
import {getAuthorizationStatus} from '../store/user-process/selectors.ts';
import {AuthorizationStatus} from '../models/authorization-status.ts';
import {AppRoutes} from '../router/app-routes.ts';

interface BookmarkButtonProps {
  id: string;
  isFavorite: boolean;
  className: string;
  width: number;
  height: number;
}

export default function BookmarkButton({
  id,
  isFavorite,
  className,
  width,
  height
}: BookmarkButtonProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function onBookmarkClick() {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoutes.Login);
      return;
    }

    dispatch(editFavoriteStatusAction({offerId: id, markFavorite: !isFavorite}));
  }

  return (
    <button
      className={`${className}__bookmark-button ${isFavorite ? `${className}__bookmark-button--active` : ''} button`}
      type="button"
      onClick={onBookmarkClick}
    >
      <svg className={`${className}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In' : 'To'}To bookmarks</span>
    </button>
  );
}
