/** @format */

import React from 'react';
import AuthService from '../../service/auth_service';
import DataBase from '../../service/database';
import Header from '../header/header';
import TodoMain from '../section_todo/todo_main';

interface MainProps {
  authService: AuthService;
  database: DataBase;
}

const Main: React.FC<MainProps> = ({ authService, database }) => {
  return (
    <div>
      <Header />
      <TodoMain />
    </div>
  );
};

export default Main;
