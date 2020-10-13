/** @format */

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../service/auth_service';
import Header from '../header/header';
import styles from './login.module.css';

interface LoginProps {
  authService: AuthService;
}

const Login: React.FC<LoginProps> = ({ authService }) => {
  const history = useHistory();

  const goToMain = (userData: UserData) => {
    history.push({
      pathname: '/main',
      state: { ...userData },
    });
  };

  const onLogin = (event: any) => {
    authService //
      .login(event.currentTarget.textContent)
      .then((data) => {
        const { displayName, email, uid } = data.user as firebase.User;
        return goToMain({ displayName, email, uid });
      });
  };

  useEffect(() => {
    authService.onAuthChange((user: any) => {
      if (user) {
        const { displayName, email, uid } = user as firebase.User;
        goToMain({ displayName, email, uid });
      }
    });
  });

  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Github
            </button>
          </li>
        </ul>
      </section>
    </section>
  );
};

export default Login;
