/** @format */

import { IconButton, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';

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
    id: Date.now().toString() + '&' + topic,
    topic: topic,
    what: '',
    until: '',
    checked: false,
    autoCheck: false,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodoData({
      ...todoData,
      [name]: value,
    });
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    addOrUpdateTodoList(todoData);
    setTodoData({
      id: Date.now().toString() + '&' + topic,
      topic: topic,
      what: '',
      until: '',
      checked: false,
      autoCheck: false,
    });
    setOpen(false);
  };

  return (
    <>
      {open && (
        <form autoComplete='off'>
          <TextField
            name='what'
            label='무엇을'
            type='text'
            onChange={onChange}
            value={todoData.what}
          />

          <TextField
            id='time'
            label='until'
            name='until'
            type='time'
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ value: todoData.until }}
          />

          <button onClick={onSubmit}>add</button>
        </form>
      )}
      <IconButton onClick={() => setOpen(!open)}>
        <AddIcon />
      </IconButton>
    </>
  );
};

export default ListAddItemForm;
