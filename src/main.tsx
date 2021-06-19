import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GlobalStoreContextProvider } from './store';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStoreContextProvider>
      <App />
    </GlobalStoreContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
