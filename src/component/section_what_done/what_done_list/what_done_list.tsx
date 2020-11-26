/** @format */

import React from 'react';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import styles from './what_done_list.module.css';

interface WhatDoneListProps {
  whatDoneList: WhatDoneList;
  customCategoryList: CustomCategoryList;
  onRemove: (id: string) => void;
}

const WhatDoneList: React.FC<WhatDoneListProps> = ({
  customCategoryList,
  whatDoneList,
  onRemove,
}) => {
  return (
    <List className={styles.ul}>
      {Object.values(whatDoneList).map((item) => {
        const foundData = Object.values(customCategoryList).find(
          (li) => li.category === item.category
        );
        return (
          <ListItem key={item.id} className={styles.li}>
            <Box
              component='div'
              p={1}
              mr={1}
              borderRadius='borderRadius'
              fontWeight='fontWeightBold'
              boxShadow={2}
              bgcolor={foundData ? foundData.color : undefined}
              color={foundData ? '#fff' : undefined}>
              {item.category}
            </Box>

            <ListItemText
              primary={`${item.startTime} - ${item.endTime}`}
              primaryTypographyProps={{ className: styles.time }}
              secondary={item.whatDo}
              secondaryTypographyProps={{ className: styles.whatDo }}
            />
            <IconButton
              onClick={() => {
                onRemove(item.id);
              }}>
              <DeleteOutlineIcon fontSize='small' className={styles.icon} />
            </IconButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default WhatDoneList;
