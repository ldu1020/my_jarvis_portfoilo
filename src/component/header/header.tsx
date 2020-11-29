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

interface HeaderProps {
  onLogout?: () => void;
  userData?: UserData;
}

const navList = [
  {
    label: '할일목록',
    path: '/main/atomic-habits',
    iconName: PlaylistAddCheckIcon,
  },
  {
    label: '한일목록',
    path: '/main/what-done',
    iconName: PieChartIcon,
  },
  {
    label: '도움말',
    path: '/main/what-done',
    iconName: HelpOutlineIcon,
  },
];

const Header: React.FC<HeaderProps> = ({ onLogout, userData }) => {
  const [navSelected, setNavSelected] = useState(0);
  const history = useHistory();
  const theme = useTheme();

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
                  style={{
                    color:
                      navSelected === index
                        ? theme.palette.warning.light
                        : '#fff',
                  }}
                  onClick={() => {
                    setNavSelected(index);
                    history.push(list.path);
                  }}>
                  <list.iconName />
                </IconButton>
              ))}
            </nav>
            <Button onClick={onLogout} color='inherit'>
              logout
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
