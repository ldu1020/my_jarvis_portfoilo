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
import { useHistory } from 'react-router-dom';
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
  const goToHome = (userData: UserData) => {
    history.push({
      pathname: '/home',
      state: { ...userData },
    });
  };
  const goToTodo = (userData: UserData) => {
    history.push({
      pathname: '/atomic-habits',
      state: { ...userData },
    });
  };
  const goToWhatDone = (userData: UserData) => {
    history.push({
      pathname: '/whatDone',
      state: { ...userData },
    });
  };

  const drawerState = [
    {
      label: '홈',
      iconName: HomeIcon,
      functionName: goToHome,
    },
    {
      label: '할일목록',
      iconName: PlaylistAddCheckIcon,
      functionName: goToTodo,
    },
    {
      label: '한일목록',
      iconName: PieChartIcon,
      functionName: goToWhatDone,
    },
  ];

  const history = useHistory();

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
        <List>
          {drawerState.map((item) => (
            <ListItem
              button
              key={item.label}
              onClick={() => {
                item.functionName(userData);
              }}>
              <ListItemIcon>
                <item.iconName />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </nav>
  );
};

export default HeaderDrawer;
