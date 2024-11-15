import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // Import Provider
import store from '../src/utils/store/appStore'; // Import the Redux store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap the app in Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

// Log performance metrics
reportWebVitals();
