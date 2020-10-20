/** @format */

import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import React, { useCallback } from 'react';
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
  const updateCheck = useCallback(() => {
    let updated = { ...todoListData };
    updated.checked = !updated.checked;
    addOrUpdateTodoList(updated);
  }, [addOrUpdateTodoList, todoListData]);

  const updateAutoCheck = useCallback(() => {
    let updated = { ...todoListData };
    updated.autoCheck = !updated.autoCheck;
    addOrUpdateTodoList(updated);
  }, [addOrUpdateTodoList, todoListData]);

  return (
    <>
      <ListItem alignItems='flex-start'>
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

        <Checkbox
          icon={<AlarmOnIcon />}
          size='small'
          checkedIcon={<AlarmOnIcon />}
          onChange={updateAutoCheck}
          checked={todoListData.autoCheck}
        />
        <Checkbox
          icon={<CheckIcon />}
          size='small'
          checkedIcon={<CheckIcon />}
          onChange={updateCheck}
          checked={todoListData.checked}
        />
        <IconButton
          onClick={() => {
            removeTodoList(todoListData.id);
          }}>
          <DeleteOutlineIcon fontSize='small' />
        </IconButton>
      </ListItem>
    </>
  );
};

export default React.memo(TopicListItem);
