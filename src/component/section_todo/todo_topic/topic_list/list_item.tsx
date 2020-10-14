/** @format */

import React from 'react';
import ListTimer from './list_timer';

interface ListitemProps {
  todoListData: TodoListData;
  removeTodoList: (id: string) => void;
  addOrUpdateTodoList: (todoListData: TodoListData) => void;
}

const ListItem: React.FC<ListitemProps> = ({
  todoListData,
  removeTodoList,
  addOrUpdateTodoList,
}) => {
  const updateCheck = () => {
    let updated = { ...todoListData };
    updated.checked = !updated.checked;
    addOrUpdateTodoList(updated);
  };

  return (
    <div>
      <h1>{todoListData.what}</h1>
      <p>{todoListData.until}</p>
      <input
        type='checkbox'
        onChange={updateCheck}
        checked={todoListData.checked}
      />
      <button
        onClick={() => {
          removeTodoList(todoListData.id);
        }}></button>
      <ListTimer
        addOrUpdateTodo={addOrUpdateTodoList}
        todoListData={todoListData}
      />
    </div>
  );
};

export default ListItem;
