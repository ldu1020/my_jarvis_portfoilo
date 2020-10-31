/** @format */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './component/login/login';
import AuthService from './service/auth_service';
import DataBase from './service/database';
import Main from './component/main/main';
import { CssBaseline, StylesProvider } from '@material-ui/core';
import './common/color.css';
import LandingPage from './component/landing_page/landing_page';

interface AppProps {
  authService: AuthService;
  database: DataBase;
}

const App: React.FC<AppProps> = ({ authService, database }) => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <StylesProvider injectFirst>
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/login'>
            <Login authService={authService} />
          </Route>
          <Route path='/main'>
            <Main authService={authService} database={database} />
          </Route>
        </Switch>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
