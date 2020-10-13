/** @format */

import React from 'react';
import TodoAddItemForm from './todo_add_item_form';
import Todoitem from './todo_item';

interface TodoListProps {
  topic: string;
  todoList: TodoList;
  addOrUpdateTodoList: (todoData: TodoListData) => void;
  removeTodoList: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  topic,
  todoList,
  addOrUpdateTodoList,
  removeTodoList,
}) => {
  return (
    <div>
      <ul>
        {Object.keys(todoList) //
          .filter((key) => {
            const topicInKey = key.split('/')[1];
            return topicInKey === topic;
          }) //
          .map((key) => {
            const data = todoList[key];
            return (
              <Todoitem
                key={key}
                id={key}
                todoListData={data}
                removeTodoList={removeTodoList}
              />
            );
          })}
      </ul>
      <TodoAddItemForm
        addOrUpdateTodoList={addOrUpdateTodoList}
        topic={topic}
      />
    </div>
  );
};

export default TodoList;
