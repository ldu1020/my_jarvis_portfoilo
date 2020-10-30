/** @format */

import { Button, Card, Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../service/auth_service';
import Header from '../header/header';
import styles from './login.module.css';
import GitHubIcon from '@material-ui/icons/GitHub';
import PeopleIcon from '@material-ui/icons/People';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

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

  const onAnonymousLogin = () => {
    authService
      .loginAnonymous() //
      .then((data) => {
        const { displayName, email, uid } = data.user as firebase.User;
        return goToMain({ displayName, email, uid });
      });
  };

  useEffect(() => {
    authService.onAuthChange((user: any) => {
      if (user) {
        console.log(user);
        const { displayName, email, uid } = user as firebase.User;
        goToMain({ displayName, email, uid });
      }
    });
  });

  return (
    <section className={styles.login}>
      <Header />
      <Container maxWidth='sm' className={styles.container}>
        <h1 className={styles.title}>LOGIN</h1>

        <Card variant='outlined' className={styles.card}>
          <Button className={styles.button} onClick={onLogin}>
            <SettingsBackupRestoreIcon className={styles.icon} />
            Google
          </Button>
          <Button className={styles.button} onClick={onLogin}>
            <GitHubIcon className={styles.icon} />
            Github
          </Button>
          <Button className={styles.button} onClick={onAnonymousLogin}>
            <PeopleIcon className={styles.icon} />
            Guest 로 로그인 하기
          </Button>
        </Card>
      </Container>
    </section>
  );
};

export default Login;
