/** @format */

import React from 'react';

interface TodoitemProps {
  todoListData: TodoListData;
  removeTodoList: (id: string) => void;
}

const Todoitem: React.FC<TodoitemProps> = ({
  todoListData,
  removeTodoList,
}) => {
  return (
    <div>
      <h1>{todoListData.what}</h1>
      <p>{todoListData.until}</p>
      <button
        onClick={() => {
          removeTodoList(todoListData.id);
        }}></button>
    </div>
  );
};

export default Todoitem;
