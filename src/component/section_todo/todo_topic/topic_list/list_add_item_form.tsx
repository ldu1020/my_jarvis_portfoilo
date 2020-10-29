/** @format */

import { IconButton, ListItem, TextField } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import styles from './list_add_item_form.module.css';

interface ListAddItemFormProps {
  addOrUpdateTodoList: (todoData: TodoListData) => void;
  topic: string;
}

const ListAddItemForm: React.FC<ListAddItemFormProps> = ({
  addOrUpdateTodoList,
  topic,
}) => {
  const [open, setOpen] = useState(false);
  const [todoData, setTodoData] = useState<TodoListData>({
    id: (Date.now() - 1).toString(),
    topic: topic,
    what: '',
    until: '',
    checked: false,
    autoCheck: false,
  });

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setTodoData({
        ...todoData,
        [name]: value,
      });
    },
    [todoData]
  );

  const onSubmit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      addOrUpdateTodoList(todoData);
      setTodoData({
        id: Date.now().toString(),
        topic: topic,
        what: '',
        until: '',
        checked: false,
        autoCheck: false,
      });
      setOpen(false);
    },
    [topic, todoData, addOrUpdateTodoList]
  );

  return (
    <ListItem className={styles.list}>
      {open ? (
        <form autoComplete='off' className={styles.form}>
          <TextField
            className={styles.what}
            name='what'
            label='무엇을'
            type='text'
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
            }}
            value={todoData.what}
          />

          <TextField
            className={styles.until}
            id='time'
            label='언제까지'
            name='until'
            type='time'
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ value: todoData.until }}
          />
          <IconButton className={styles.submit} onClick={onSubmit}>
            <AddIcon />
          </IconButton>
        </form>
      ) : (
        <IconButton className={styles.toggleBtn} onClick={() => setOpen(!open)}>
          <AddIcon />
        </IconButton>
      )}
    </ListItem>
  );
};

export default React.memo(ListAddItemForm);
