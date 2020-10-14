/** @format */

import React from 'react';
import TopicList from './topic_list/topic_list';

interface TodoTopicProps {
  topicData: TodoTopicData;
  todoList: TodoList;
  removeTopic: (id: string, topic: string) => void;
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
      <button onClick={() => removeTopic(topicData.id, topicData.topic)}>
        topicRemove
      </button>
      <h1>{topicData.topic}</h1>
      <TopicList
        topic={topicData.topic}
        todoList={todoList}
        addOrUpdateTodoList={addOrUpdateTodoList}
        removeTodoList={removeTodoList}
      />
    </div>
  );
};

export default TodoTopic;
