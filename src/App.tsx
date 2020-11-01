/** @format */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './component/login/login';
import AuthService from './service/auth_service';
import DataBase from './service/database';
import { CssBaseline, StylesProvider } from '@material-ui/core';
import './common/color.css';
import LandingPage from './component/landing_page/landing_page';
import Loading from './component/loading/loading';

const Main = lazy(() => import('./component/main/main'));

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
            <Suspense fallback={<Loading />}>
              <Main authService={authService} database={database} />
            </Suspense>
          </Route>
        </Switch>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
