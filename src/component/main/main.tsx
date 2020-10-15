/** @format */

import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../service/auth_service';
import DataBase from '../../service/database';
import Header from '../header/header';
import TodoMain from '../section_todo/todo_main';

interface MainProps {
  authService: AuthService;
  database: DataBase;
}

const Main: React.FC<MainProps> = ({ authService, database }) => {
  const history = useHistory();
  const [userId, setUserId] = useState(
    history.location.state && (history.location.state as UserData).uid
  );
  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  useEffect(() => {
    authService.onAuthChange((user: firebase.User) => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push('/');
      }
    });
  }, [authService, userId, history]);
  return (
    <div>
      <Header
        userData={history.location.state as UserData}
        onLogout={onLogout}
      />

      <TodoMain authService={authService} database={database} userId={userId} />
    </div>
  );
};

export default Main;
