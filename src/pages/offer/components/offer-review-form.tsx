import {ChangeEvent, FormEvent, Fragment, useState} from 'react';

const RATING = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly'
};

const MIN_REVIEW_LENGTH = 10;
const MAX_REVIEW_LENGTH = 100;

export default function OfferReviewForm() {
  const [formData, setFormData] = useState<{ rating: number | null; review: string }>({'rating': null, 'review': ''});
  const isValid = formData.rating !== null &&
    formData.review.length >= MIN_REVIEW_LENGTH &&
    formData.review.length <= MAX_REVIEW_LENGTH;

  function onReviewChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    const {name, value} = e.currentTarget;
    setFormData({...formData, [name]: value});
  }

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(formData);
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(RATING).map(([value, title]) => (
          <Fragment key={`${value}-stars`}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={onReviewChange}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        maxLength={MAX_REVIEW_LENGTH}
        onChange={onReviewChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
