/** @format */

import React from 'react';
import ListItem from './list_item';
import ListAddItemForm from './list_add_item_form';

interface TopicListProps {
  topic: string;
  todoList: TodoList;
  addOrUpdateTodoList: (todoData: TodoListData) => void;
  removeTodoList: (id: string) => void;
}

const TopicList: React.FC<TopicListProps> = ({
  topic,
  todoList,
  addOrUpdateTodoList,
  removeTodoList,
}) => {
  return (
    <div>
      <ul>
        {todoList &&
          Object.keys(todoList) //
            .filter((key) => {
              const topicInKey = key.split('&')[1];
              return topicInKey === topic;
            }) //
            .map((key) => {
              const data = todoList[key];
              return (
                <ListItem
                  key={key}
                  todoListData={data}
                  removeTodoList={removeTodoList}
                  addOrUpdateTodoList={addOrUpdateTodoList}
                />
              );
            })}
      </ul>
      <ListAddItemForm
        addOrUpdateTodoList={addOrUpdateTodoList}
        topic={topic}
      />
    </div>
  );
};

export default TopicList;
