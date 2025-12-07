import {Link, useLocation} from 'react-router-dom';
import HeaderNavigation from './header-navigation.tsx';
import {AppRoutes} from '../../router/app-routes.ts';

interface HeaderProps {
  showNavigation: boolean;
}

export default function Header({
  showNavigation
}: HeaderProps) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={`header__logo-link ${location.pathname === AppRoutes.Root.toString() ? 'header__logo-link--active' : ''}`}
              to={AppRoutes.Root}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41}/>
            </Link>
          </div>
          {showNavigation && <HeaderNavigation/>}
        </div>
      </div>
    </header>
  );
}
