import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GiftViewer from './GiftViewer';
import Headers from './Header';
import Footer from './Footer';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Headers />
    <GiftViewer />
    <Footer />
  </React.StrictMode>
);

reportWebVitals();
