import {City} from '../../../models/city.ts';
import {useAppSelector} from '../../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../../hooks/use-app-dispatch.ts';
import React, {memo} from 'react';
import {getCity} from '../../../store/options-process/selectors.ts';
import {changeCityAction} from '../../../store/options-process/options-process.ts';
import {Link} from 'react-router-dom';
import {AppRoutes} from '../../../router/app-routes.ts';

interface CitiesListProps {
  cities: readonly City[];
}

export const CitiesList = memo(({
  cities
}: CitiesListProps) => {
  const selectedCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  function onCityClick(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>, city: City) {
    evt.preventDefault();
    dispatch(changeCityAction(city));
  }

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((city) => (
              <li className="locations__item" key={city.name}>
                <Link
                  className={`locations__item-link tabs__item ${selectedCity === city ? 'tabs__item--active' : ''}`}
                  to={AppRoutes.Root}
                  onClick={(evt) => onCityClick(evt, city)}
                >
                  <span>{city.name}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
});

CitiesList.displayName = 'CitiesList';
