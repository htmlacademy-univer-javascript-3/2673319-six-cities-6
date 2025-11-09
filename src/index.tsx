import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import {FAVORITES_MOCK, OFFER_PREVIEWS_MOCK, REVIEWS_MOCK} from './mocks/mocks.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offerPreviews={OFFER_PREVIEWS_MOCK} favorites={FAVORITES_MOCK} reviews={REVIEWS_MOCK}/>
  </React.StrictMode>
);
