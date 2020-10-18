/** @format */

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './header.module.css';

interface HeaderProps {
  onLogout?: () => void;
  userData?: UserData;
}

const Header: React.FC<HeaderProps> = ({ onLogout, userData }) => {
  console.log(userData);
  return (
    <AppBar position='static' className={styles.header}>
      <Toolbar>
        <IconButton
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
          <div>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={onLogout}
              color='inherit'>
              <AccountCircle />
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
