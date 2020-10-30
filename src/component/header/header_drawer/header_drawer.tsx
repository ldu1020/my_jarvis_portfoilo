/** @format */

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header_drawer.module.css';
import HomeIcon from '@material-ui/icons/Home';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PieChartIcon from '@material-ui/icons/PieChart';

interface HeaderDrawerProps {
  userData: UserData;
  open: boolean;
  toggleOpen: () => void;
}

const HeaderDrawer: React.FC<HeaderDrawerProps> = ({
  userData,
  open,
  toggleOpen,
}) => {
  const drawerState = [
    {
      label: '홈',
      path: '/home',
      iconName: HomeIcon,
    },
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
  ];

  return (
    <nav className={styles.nav} aria-label='mailbox folders'>
      <Drawer
        variant='temporary'
        anchor='left'
        open={open}
        onClose={toggleOpen}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}>
        <List className={styles.list}>
          {drawerState.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              style={{ textDecoration: 'none' }}>
              <ListItem className={styles.item} button>
                <ListItemIcon>
                  <item.iconName />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ className: styles.text }}
                />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
    </nav>
  );
};

export default HeaderDrawer;
