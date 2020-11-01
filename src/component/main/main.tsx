/** @format */

import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, useHistory, Switch } from 'react-router-dom';
import AuthService from '../../service/auth_service';
import DataBase from '../../service/database';
import Header from '../header/header';
import TodoMain from '../section_todo/todo_main';
import WhatDoneMain from '../section_what_done/what_done_main';

interface MainProps {
  authService: AuthService;
  database: DataBase;
}

const Main: React.FC<MainProps> = ({ authService, database }) => {
  const history = useHistory();
  const [userData, setUserId] = useState<UserData>();
  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  useEffect(() => {
    authService.onAuthChange((user: firebase.User) => {
      if (user) {
        const { uid, displayName, email } = user;
        const data = { uid, displayName, email };
        setUserId(data);
      } else {
        history.push('/');
      }
    });
  }, [authService, history]);
  return (
    <div>
      <BrowserRouter>
        <Header userData={userData} onLogout={onLogout} />
        <Switch>
          <Route exact path={['/main', '/main/what-done']}>
            <WhatDoneMain
              authService={authService}
              database={database}
              userId={userData ? userData.uid : null}
            />
          </Route>
          <Route exact path='/main/atomic-habits'>
            <TodoMain
              authService={authService}
              database={database}
              userId={userData ? userData.uid : null}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Main;
