/** @format */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './component/login/login';
import AuthService from './service/auth_service';
import DataBase from './service/database';
import Main from './component/main/main';

interface AppProps {
  authService: AuthService;
  database: DataBase;
}

const App: React.FC<AppProps> = ({ authService, database }) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Login authService={authService} />
          </Route>
          <Route path='/main'>
            <Main authService={authService} database={database} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
