/** @format */

import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TodoAddTopicForm from './todo_add_topic_form/todo_add_topic_form';
import TodoList from './todo_topic/todo_list';
import TodoTopic from './todo_topic/todo_topic';

const initialState = {
  topicList: [] as TodoTopic,
  todoList: {} as TodoList,
};

function todoReducer(state: TodoState, action: TodoAction) {
  const { topicList, todoList } = state;
  let updated;

  switch (action.type) {
    case 'ADD_TOPIC':
      return { ...state, topicList: [...topicList, action.topic] };
    case 'REMOVE_TOPIC':
      const filteredTopic = topicList.filter((list) => {
        return list.id !== action.id;
      });
      const filteredTodoList = { ...todoList };
      Object.keys(filteredTodoList) //
        .filter((key) => {
          const topicInKey = key.split('/')[1];
          return topicInKey === action.topic;
        }) //
        .forEach((key) => {
          delete filteredTodoList[key];
        });
      updated = { topicList: filteredTopic, todoList: filteredTodoList };
      return updated;
    case 'ADD_OR_UPDATE_TODO_LIST':
      updated = { ...todoList };
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
    </div>
  );
};

export default TodoMain;
