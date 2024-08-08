import React from 'react';
import ReactDOM from 'react-dom/client';
import {Chat, Login} from './App';
import reportWebVitals from './reportWebVitals';

const login = ReactDOM.createRoot(document.getElementById('login'));
login.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);


reportWebVitals();
