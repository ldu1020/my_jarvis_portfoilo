/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthService from './service/auth_service';
import DataBase from './service/database';

const authService = new AuthService();
const database = new DataBase();

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} database={database} />
  </React.StrictMode>,
  document.getElementById('root')
);
