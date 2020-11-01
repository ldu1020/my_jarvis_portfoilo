/** @format */

import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import React from 'react';
import ListTimer from './list_timer';
import CheckIcon from '@material-ui/icons/Check';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import styles from './topic_list_item.module.css';

interface TopicListitemProps {
  todoListData: TodoListData;
  removeTodoList: (id: string) => void;
  addOrUpdateTodoList: (todoListData: TodoListData) => void;
}

const TopicListItem: React.FC<TopicListitemProps> = ({
  todoListData,
  removeTodoList,
  addOrUpdateTodoList,
}) => {
  const updateCheck = () => {
    let updated = { ...todoListData };
    updated.checked = !updated.checked;
    addOrUpdateTodoList(updated);
  };

  const updateAutoCheck = () => {
    let updated = { ...todoListData };
    updated.autoCheck = !updated.autoCheck;
    addOrUpdateTodoList(updated);
  };

  return (
    <ListItem alignItems='flex-start' className={styles.item}>
      <ListItemText
        primary={todoListData.what}
        primaryTypographyProps={{ noWrap: true, className: styles.what }}
        secondary={
          <ListTimer
            addOrUpdateTodo={addOrUpdateTodoList}
            todoListData={todoListData}
          />
        }
      />

      <Tooltip title='Auto-Check: 시간 설정시 자동 체크'>
        <Checkbox
          icon={<AlarmOnIcon className={styles.icon} />}
          size='small'
          checkedIcon={<AlarmOnIcon className={styles.icon} />}
          onChange={updateAutoCheck}
          checked={todoListData.autoCheck}
        />
      </Tooltip>
      <Checkbox
        icon={<CheckIcon className={styles.icon} />}
        size='small'
        checkedIcon={<CheckIcon className={styles.icon} />}
        onChange={updateCheck}
        checked={todoListData.checked}
      />
      <IconButton
        onClick={() => {
          removeTodoList(todoListData.id);
        }}>
        <DeleteOutlineIcon fontSize='small' className={styles.icon} />
      </IconButton>
    </ListItem>
  );
};

export default React.memo(TopicListItem);
