/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { CssBaseline, StylesProvider } from '@material-ui/core';

import { AuthService } from './service/auth_service';
import { DataBase } from './service/database';

import './index.css';

const authService = new AuthService();
const database = new DataBase();

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <StylesProvider injectFirst>
      <App authService={authService} database={database} />
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
