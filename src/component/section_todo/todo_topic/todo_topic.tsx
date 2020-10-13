/** @format */

import React from 'react';
import TodoList from './todo_list';

interface TodoTopicProps {
  topicData: TodoTopicData;
  todoList: TodoList;
  removeTopic: (id: string) => void;
  addOrUpdateTodoList: (todoList: TodoListData) => void;
  removeTodoList: (id: string) => void;
}

const TodoTopic: React.FC<TodoTopicProps> = ({
  topicData,
  todoList,
  removeTopic,
  addOrUpdateTodoList,
  removeTodoList,
}) => {
  return (
    <div>
      <button onClick={() => removeTopic(topicData.id)}>topicRemove</button>
      <h1>{topicData.topic}</h1>
      <TodoList
        topic={topicData.topic}
        todoList={todoList}
        addOrUpdateTodoList={addOrUpdateTodoList}
        removeTodoList={removeTodoList}
      />
    </div>
  );
};

export default TodoTopic;
