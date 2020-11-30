/** @format */

import React from 'react';
import { useHistory } from 'react-router-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import styles from './bottom_nav.module.css';

interface BottomNavProps {
  list: {
    label: string;
    path: string;
    icon: React.ReactNode;
  }[];
  selected: number;
  setSelected: (number: number) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({
  list,
  selected,
  setSelected,
}) => {
  const history = useHistory();

  return (
    <BottomNavigation
      value={selected}
      onChange={(event, newValue) => {
        setSelected(newValue);
        history.push(list[newValue].path);
      }}
      showLabels
      className={styles.nav}>
      {list.map((li) => (
        <BottomNavigationAction
          key={li.label}
          label={li.label}
          icon={li.icon}
        />
      ))}
    </BottomNavigation>
  );
};

export default BottomNav;
