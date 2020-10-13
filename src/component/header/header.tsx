/** @format */

import React from 'react';
import styles from './header.module.css';

interface HeaderProps {
  onLogout?: () => void;
  userData?: UserData;
}

const Header: React.FC<HeaderProps> = ({ onLogout, userData }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>MY JARVIS</h1>
      {userData && onLogout && (
        <div className={styles.user}>
          <p>{`${userData.displayName || userData.email}`}</p>
          <button className={styles.button} onClick={onLogout}>
            LogOut
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
