import React from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {logoutAction} from '../../store/api-actions.ts';
import {AuthorizationStatus} from '../../models/authorization-status.ts';
import {AppRoutes} from '../../router/app-routes.ts';
import {getAuthorizationStatus, getCurrentUser} from '../../store/user-process/selectors.ts';

export function HeaderNavigation() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const currentUser = useAppSelector(getCurrentUser);
  const dispatch = useAppDispatch();

  function handleSignOut(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    evt.preventDefault();
    dispatch(logoutAction());
  }

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Favorites}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
                <img className="user__avatar" src={currentUser!.avatarUrl} alt="User Avatar"/>
              </div>
              <span className="header__user-name user__name">{currentUser!.email}</span>
              <span className="header__favorite-count">3</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <a className="header__nav-link" onClick={(evt) => handleSignOut(evt)}>
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Login}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
