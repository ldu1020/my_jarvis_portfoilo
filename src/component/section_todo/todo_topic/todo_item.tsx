/** @format */

import React from 'react';

interface TodoitemProps {
  todoListData: TodoListData;
  removeTodoList: (id: string) => void;
  id: string;
}

const Todoitem: React.FC<TodoitemProps> = ({
  todoListData,
  removeTodoList,
  id,
}) => {
  return (
    <div>
      <h1>{todoListData.what}</h1>
      <p>{todoListData.until}</p>
      <button
        onClick={() => {
          removeTodoList(id);
        }}></button>
    </div>
  );
};

export default Todoitem;
