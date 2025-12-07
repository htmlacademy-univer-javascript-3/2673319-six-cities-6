import {City} from '../../../models/city.ts';
import {useAppSelector} from '../../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../../hooks/use-app-dispatch.ts';
import {memo} from 'react';
import {getCity} from '../../../store/options-process/selectors.ts';
import {changeCityAction} from '../../../store/options-process/options-process.ts';

interface CitiesListProps {
  cities: readonly City[];
}

export const CitiesList = memo(({
  cities
}: CitiesListProps)=> {
  const selectedCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  function onCityClick(city: City) {
    dispatch(changeCityAction(city));
  }

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((city) => (
              <li className="locations__item" key={city.name}>
                <a
                  className={`locations__item-link tabs__item ${selectedCity === city ? 'tabs__item--active' : ''}`}
                  onClick={() => onCityClick(city)}
                  href="#"
                >
                  <span>{city.name}</span>
                </a>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
});

CitiesList.displayName = 'CitiesList';
