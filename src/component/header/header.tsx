/** @format */

import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './header.module.css';
import HeaderDrawer from './header_drawer/header_drawer';

interface HeaderProps {
  onLogout?: () => void;
  userData?: UserData;
}

const Header: React.FC<HeaderProps> = ({ onLogout, userData }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar position='static' className={styles.header}>
      <Toolbar>
        <IconButton
          onClick={() => {
            setDrawerOpen(!drawerOpen);
          }}
          edge='start'
          className={styles.menuButton}
          color='inherit'
          aria-label='menu'>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' className={styles.title}>
          MY JARVIS
        </Typography>
        {userData && (
          <Button
            className={styles.logoutBtn}
            onClick={onLogout}
            color='inherit'>
            logout
          </Button>
        )}
      </Toolbar>
      {userData && (
        <HeaderDrawer
          userData={userData}
          open={drawerOpen}
          toggleOpen={() => {
            setDrawerOpen(!drawerOpen);
          }}
        />
      )}
    </AppBar>
  );
};

export default Header;
