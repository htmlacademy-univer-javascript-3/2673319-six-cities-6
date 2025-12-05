import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import {FAVORITES_MOCK, REVIEWS_MOCK} from './mocks/mocks.ts';
import {Provider} from 'react-redux';
import {store} from './store';
import {fetchOfferPreviewsAction} from './store/api-actions.ts';

store.dispatch(fetchOfferPreviewsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App favorites={FAVORITES_MOCK} reviews={REVIEWS_MOCK}/>
    </Provider>
  </React.StrictMode>
);
