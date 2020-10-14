/** @format */

import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TodoAddTopicForm from './todo_add_topic_form/todo_add_topic_form';
import TodoGraph from './todo_graph/todo_graph';
import { initialState, todoReducer } from './todo_reducer';
import TodoList from './todo_topic/todo_list';
import TodoTopic from './todo_topic/todo_topic';

const TodoMain: React.FC = () => {
  const history = useHistory();
  const [todoState, dispatch] = useReducer(todoReducer, initialState);
  const [userId, setUserId] = useState(
    history.location.state && (history.location.state as UserData).uid
  );

  const addTopic = (topic: TodoTopicData) => {
    dispatch({
      type: 'ADD_TOPIC',
      topic,
    });
  };

  const removeTopic = (id: string, topic: string) => {
    dispatch({
      type: 'REMOVE_TOPIC',
      id,
      topic,
    });
  };

  const addOrUpdateTodoList = (todoData: TodoListData) => {
    dispatch({
      type: 'ADD_OR_UPDATE_TODO_LIST',
      todoData,
    });
  };

  const removeTodoList = (id: string) => {
    dispatch({
      type: 'REMOVE_TODO_LIST',
      id,
    });
  };

  return (
    <div>
      <section>
        {todoState.topicList.map((topicData: TodoTopicData) => {
          return (
            <TodoTopic
              key={topicData.id}
              topicData={topicData}
              todoList={todoState.todoList}
              removeTopic={removeTopic}
              addOrUpdateTodoList={addOrUpdateTodoList}
              removeTodoList={removeTodoList}
            />
          );
        })}
        <TodoAddTopicForm onAdd={addTopic} />
      </section>
      <section>
        <TodoGraph todoList={todoState.todoList} />
      </section>
    </div>
  );
};

export default TodoMain;
