import {Link, Navigate} from 'react-router-dom';
import {useAppSelector} from '../hooks/use-app-selector.ts';
import {useAppDispatch} from '../hooks/use-app-dispatch.ts';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {loginAction} from '../store/api-actions.ts';
import {AuthorizationStatus} from '../models/authorization-status.ts';
import {AppRoutes} from '../router/app-routes.ts';
import Header from '../components/header/header.tsx';
import {getAuthorizationStatus} from '../store/user-process/selectors.ts';
import {changeCityAction} from '../store/options-process/options-process.ts';
import {CITIES} from '../models/city.ts';

function getRandomCity(): string {
  const randomIndex = Math.floor(Math.random() * CITIES.length);
  return CITIES[randomIndex].name;
}

function isValidPassword(password: string) {
  const containsLetter = /[A-Za-z]/.test(password);
  const containsDigit = /\d/.test(password);
  return containsLetter && containsDigit;
}

export default function LoginPage() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<{ email: string; password: string }>({email: '', password: ''});

  function onFieldChange(evt: ChangeEvent<HTMLInputElement>) {
    const {name, value} = evt.currentTarget;
    setFormData({...formData, [name]: value});
  }

  function onFormSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const password = formData.password;
    if (!isValidPassword(password)) {
      // eslint-disable-next-line no-alert
      alert('Invalid password');
      return;
    }
    dispatch(loginAction({email: formData.email, password: password}));
  }

  function onCityLinkClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    const span = event.currentTarget.querySelector('span');
    if (span && span.textContent) {
      const city = CITIES.find((c) => c.name === span.textContent)!;
      dispatch(changeCityAction(city));
    }
  }

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoutes.Root}/>;
  }

  return (
    <div className="page page--gray page--login">
      <Header showNavigation={false}/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={onFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={onFieldChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={onFieldChange}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoutes.Root} onClick={onCityLinkClick}>
                <span>{getRandomCity()}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
