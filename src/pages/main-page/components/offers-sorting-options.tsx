import {useState} from 'react';
import {useAppSelector} from '../../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../../hooks/use-app-dispatch.ts';
import {SortingOption} from '../../../models/sorting-option.ts';
import {OfferBase} from '../../../models/offer.ts';
import {changeSortingOption} from '../../../store/action.ts';
import {OFFERS_SORTING_OPTIONS} from '../../../mocks/mocks.ts';

export default function OffersSortingOptions() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectedSortingOption = useAppSelector((state) => state.sortingOption);
  const dispatch = useAppDispatch();

  function onOpenClick() {
    setIsOpen(!isOpen);
  }

  function onSortingOptionClick(sortingOption: SortingOption<OfferBase>) {
    dispatch(changeSortingOption({sortingOption}));
    setIsOpen(!isOpen);
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={onOpenClick}>
        {selectedSortingOption.name}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {
            OFFERS_SORTING_OPTIONS.map((option) => (
              <li
                key={option.name}
                tabIndex={0}
                className={`places__option ${option.name === selectedSortingOption.name ? 'places__option--active' : ''}`}
                onClick={() => onSortingOptionClick(option)}
              >
                {option.name}
              </li>
            ))
          }
        </ul>
      )}
    </form>
  );
}
