/** @format */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';

import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PieChartIcon from '@material-ui/icons/PieChart';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import styles from './header.module.css';
import BottomNav from './bottom_nav';

interface HeaderProps {
  onLogout?: () => void;
  userData?: UserData;
}

const navList = [
  {
    label: '할일목록',
    path: '/main/atomic-habits',
    icon: <PlaylistAddCheckIcon />,
  },
  {
    label: '한일목록',
    path: '/main/what-done',
    icon: <PieChartIcon />,
  },
  {
    label: '도움말',
    path: '/main/get-start',
    icon: <HelpOutlineIcon />,
  },
];

const Header: React.FC<HeaderProps> = ({ onLogout, userData }) => {
  const history = useHistory();
  const theme = useTheme();
  const [navSelected, setNavSelected] = useState(() => {
    switch (history.location.pathname) {
      case '/main/atomic-habits':
        return 0;
      case '/main/what-done':
        return 1;
      case '/main/get-start':
        return 2;
      default:
        return 0;
    }
  });

  return (
    <AppBar position='static' className={styles.header}>
      <Toolbar>
        <Typography variant='h6' className={styles.title}>
          MY JARVIS
        </Typography>
        {userData && (
          <div className={styles.tools}>
            <nav className={styles.nav}>
              {navList.map((list, index) => (
                <IconButton
                  key={list.label}
                  style={{
                    color:
                      navSelected === index
                        ? theme.palette.warning.light
                        : '#fff',
                  }}
                  onClick={() => {
                    history.push(list.path);
                    setNavSelected(index);
                  }}>
                  {list.icon}
                </IconButton>
              ))}
            </nav>
            <Button onClick={onLogout} color='inherit'>
              logout
            </Button>
          </div>
        )}
      </Toolbar>
      {userData && (
        <BottomNav
          list={navList}
          selected={navSelected}
          setSelected={setNavSelected}
        />
      )}
    </AppBar>
  );
};

export default Header;
