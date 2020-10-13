/** @format */

import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TodoAddTopicForm from './todo_add_topic_form/todo_add_topic_form';
import TodoTopic from './todo_topic/todo_topic';

const initialState = {
  topicList: [] as TodoTopic,
  todoList: {} as TodoList,
};

function todoReducer(state: any, action: any) {
  const { topicList, todoList } = state;

  let updated;
  switch (action.type) {
    case 'ADD_TOPIC':
      return { ...state, topicList: [...topicList, action.topic] };
    case 'REMOVE_TOPIC':
      updated = topicList.filter((list: any) => {
        return list.id !== action.id;
      });
      return { ...state, topicList: updated };
    case 'ADD_OR_UPDATE_TODO_LIST':
      console.log(action.todoData);
      updated = { ...todoList };
      console.log(action.todoData.id + '/' + action.todoData.topic);
      updated[action.todoData.id + '/' + action.todoData.topic] =
        action.todoData;
      return { ...state, todoList: updated };
    case 'REMOVE_TODO_LIST':
      updated = { ...todoList };
      delete updated[action.id];
      return { ...state, todoList: updated };
    default:
      return state;
  }
}

const TodoMain: React.FC = () => {
  const history = useHistory();
  const [todoState, dispatch] = useReducer(todoReducer, initialState);
  const [userId, setUserId] = useState(
    history.location.state && (history.location.state as UserData).uid
  );

  const addTopic = (topic: any) => {
    dispatch({
      type: 'ADD_TOPIC',
      topic: topic,
    });
  };

  const removeTopic = (id: any) => {
    dispatch({
      type: 'REMOVE_TOPIC',
      id: id,
    });
  };

  const addOrUpdateTodoList = (todoData: any) => {
    dispatch({
      type: 'ADD_OR_UPDATE_TODO_LIST',
      todoData: todoData,
    });
  };

  const removeTodoList = (id: any) => {
    dispatch({
      type: 'REMOVE_TODO_LIST',
      id: id,
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
    </div>
  );
};

export default TodoMain;
