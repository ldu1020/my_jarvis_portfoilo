/** @format */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthServiceType } from './service/auth_service';
import { DataBaseType } from './service/database';

import Login from './component/login/login';
import LandingPage from './component/landing_page/landing_page';
import Loading from './component/loading/loading';
import './common/color.css';

const Main = lazy(() => import('./component/main/main'));

interface AppProps {
  authService: AuthServiceType;
  database: DataBaseType;
}

const App: React.FC<AppProps> = ({ authService, database }) => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
